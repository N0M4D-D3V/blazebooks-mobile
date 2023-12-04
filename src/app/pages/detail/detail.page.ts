import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '@interfaces/book.interface';
import { RoutePath } from '@interfaces/route.interface';
import { BookService } from '@services/book.service';
import {
  DemiCardConfig,
  DemiCardImgComponent,
  DemiCardListComponent,
  DemiCardSize,
  DemiSeparePipe,
} from 'demiurge';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-detail',
  template: `
    @if(currentBook$ | async; as currentBook){
    <demi-card-img
      [item]="currentBook"
      (onReadTouched)="onRead($event)"
    ></demi-card-img>
    <p class="genre-text text-end px-3 fadein">
      <b>Genres: </b> {{ currentBook.genres | separe }}
    </p>
    <div class="container px-3">
      <p>{{ currentBook.description }}</p>
    </div>
    <demi-card-list
      [items$]="related"
      [config]="cardListConfig"
      (onCardTouched)="onCardTouched($event)"
    ></demi-card-list>
    }
  `,
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    DemiCardListComponent,
    DemiCardImgComponent,
    DemiSeparePipe,
    AsyncPipe,
  ],
})
export class DetailPage {
  public currentBook$: Observable<Book> = this.bookService.getCurrentBook$();
  public cardListConfig: DemiCardConfig = {
    isClickable: true,
    size: DemiCardSize.S,
  };

  public related: Observable<Book[]> = of(this.bookService.getRelatedBooks());

  constructor(
    private readonly router: Router,
    private readonly bookService: BookService
  ) {}

  public onRead(book: Book): void {
    this.bookService.setCurrentBook(book);
    this.router.navigate([RoutePath.Reader]);
  }

  public onCardTouched(book: Book): void {
    this.bookService.setCurrentBook(book);
    this.router.navigate([RoutePath.Detail]);
  }
}
