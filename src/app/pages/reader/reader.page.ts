import { AsyncPipe, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Book } from '@interfaces/book.interface';
import { RoutePath } from '@interfaces/route.interface';
import { BookService } from '@services/book.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-reader',
  template: `
    @if (book$ | async; as book) {
    <div #dynamicContainer [innerHTML]="trustedHtml"></div>
    }
  `,
  styleUrls: [],
  standalone: true,
  imports: [NgIf, AsyncPipe, HttpClientModule],
})
export class ReaderPage implements OnInit, OnDestroy {
  @ViewChild('dynamicContainer') dynamicContainer: ElementRef | undefined;

  private subBook!: Subscription;

  public book$!: Observable<Book | undefined>;
  public trustedHtml: SafeHtml | undefined;

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly sanitizer: DomSanitizer,
    private readonly bookService: BookService
  ) {}

  ngOnInit(): void {
    this.book$ = this.bookService.getCurrentBookObservable();

    this.subBook = this.book$.subscribe((book: Book | undefined) => {
      if (!book) this.router.navigate([RoutePath.Home]);
      else this.loadTemplate();
    });
  }

  private loadTemplate(): void {
    this.http
      .get('assets/template.html', { responseType: 'text' })
      .subscribe((data) => {
        this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(data);
        this.loadJS();
      });
  }

  private loadJS(): void {
    const scriptElement = document.createElement('script');
    scriptElement.src = 'assets/reader-script.js';
    document.body.appendChild(scriptElement);
  }

  ngOnDestroy(): void {
    this.subBook.unsubscribe();
  }
}
