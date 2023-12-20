import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '@interfaces/book.interface';
import { RoutePath } from '@interfaces/route.interface';
import { BookService } from '@services/book.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-reader',
  template: `
    @if (book$ | async; as book) {
    <h1 class="text-center">Reader page</h1>
    <p class="text-center">Reading {{ book.title }} ...</p>
    }
  `,
  styleUrls: [],
  standalone: true,
  imports: [NgIf, AsyncPipe],
})
export class ReaderPage implements OnInit, OnDestroy {
  private subBook!: Subscription;

  public book$!: Observable<Book | undefined>;

  constructor(
    private readonly router: Router,
    private readonly bookService: BookService
  ) {}

  ngOnInit(): void {
    this.book$ = this.bookService.getCurrentBookObservable();

    this.subBook = this.book$.subscribe((book: Book | undefined) => {
      if (!book) this.router.navigate([RoutePath.Home]);
    });
  }

  ngOnDestroy(): void {
    this.subBook.unsubscribe();
  }
}
