import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DemiCardConfig,
  DemiCardImgComponent,
  DemiCardListComponent,
  DemiCardSize,
} from 'demiurge';
import { Observable, Subscription } from 'rxjs';
import { BookService } from '@services/book.service';
import { AsyncPipe } from '@angular/common';
import { Book } from '@interfaces/book.interface';
import { Router } from '@angular/router';
import { RoutePath } from '@interfaces/route.interface';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      <demi-card-img
        [item]="currentBook"
        [config]="{ isClickable: true }"
        (onReadTouched)="onReadTouched($event)"
        (onCardTouched)="onCardTouched($event)"
      ></demi-card-img>

      <demi-card-list
        [items$]="books$"
        [config]="cardListConfig"
        (onCardTouched)="onCardTouched($event)"
      ></demi-card-list>
    </div>
  `,
  styleUrls: [],
  standalone: true,
  imports: [AsyncPipe, DemiCardImgComponent, DemiCardListComponent],
})
export class HomePage implements OnInit, OnDestroy {
  private subBooks!: Subscription;

  public currentBook!: Book;
  public books$!: Observable<Book[]>;
  public cardListConfig: DemiCardConfig = {
    size: DemiCardSize.M,
    isClickable: true,
    canSearch: true,
  };

  constructor(
    private readonly router: Router,
    private readonly bookService: BookService
  ) {}

  ngOnInit(): void {
    this.currentBook = this.bookService.getCurrentBook();

    this.books$ = this.bookService.getBooks$();
    this.subBooks = this.books$.subscribe();
  }

  public onReadTouched(book: Book): void {
    this.bookService.setCurrentBook(book);
    this.router.navigate([RoutePath.Reader]);
  }

  public onCardTouched(book: Book): void {
    this.bookService.setCurrentBook(book);
    this.router.navigate([RoutePath.Detail]);
  }

  ngOnDestroy(): void {
    this.subBooks.unsubscribe();
  }
}
