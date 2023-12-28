import { AsyncPipe, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book, BookChapter, BookPage } from '@interfaces/book.interface';
import { RoutePath } from '@interfaces/route.interface';
import { BookService } from '@services/book.service';
import { LocalBookService } from '@services/local-book.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrls: ['./reader.page.scss'],
  standalone: true,
  imports: [NgIf, AsyncPipe, UpperCasePipe],
})
export class ReaderPage implements OnInit, OnDestroy {
  private subBook!: Subscription;
  private currentBook!: Book;

  public book$!: Observable<Book | undefined>;

  public currentChapter!: BookChapter | undefined;
  public currentPage!: BookPage | undefined;

  constructor(
    private readonly router: Router,
    private readonly bookService: BookService,
    private readonly localBookService: LocalBookService
  ) {}

  ngOnInit(): void {
    this.book$ = this.bookService.getCurrentBookObservable();

    this.subBook = this.book$.subscribe((book: Book | undefined) => {
      if (!book) this.router.navigate([RoutePath.Home]);
      else this.onLoadBook(book);
    });
  }

  private onLoadBook(book: Book): void {
    this.currentBook = book;
    this.currentChapter = this.localBookService.getChapter(book.id);
    this.currentPage = this.localBookService.getPage(
      book.id,
      this.currentChapter!.id
    );
  }

  public loadPage(pageId: string): void {
    console.log(pageId);

    this.currentPage = this.localBookService.getPage(
      this.currentBook.id,
      this.currentChapter!.id,
      pageId
    );
  }

  ngOnDestroy(): void {
    this.subBook.unsubscribe();
  }
}
