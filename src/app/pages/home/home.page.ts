import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DemiCardComponent,
  DemiCardConfig,
  DemiCardImgComponent,
  DemiCardListComponent,
  DemiCardSize,
} from 'demiurge';
import { Observable, Subscription, map } from 'rxjs';
import { BookService } from '@services/book.service';
import { AsyncPipe } from '@angular/common';
import { Book } from '@interfaces/book.interface';
import { Router } from '@angular/router';
import { RoutePath } from '@interfaces/route.interface';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      @if(currentBook$ | async; as current){
      <demi-card-img
        [config]="current"
        (onReadTouched)="onReadTouched($event)"
      ></demi-card-img>
      }

      <demi-card-list
        [config$]="books$"
        [canSearch]="true"
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

  public currentBook$: Observable<DemiCardConfig<Book>> =
    this.bookService.currentBook$.pipe(
      map((x) => {
        x.size = DemiCardSize.XL;
        return x;
      })
    );
  public books$: Observable<DemiCardConfig<Book>[]> =
    this.bookService.books$.pipe(
      map((x) => {
        return x.map((book) => {
          book.size = DemiCardSize.M;
          book.isClickable = true;
          return book;
        });
      })
    );

  constructor(
    private readonly router: Router,
    private readonly bookService: BookService
  ) {}

  ngOnInit(): void {
    this.subBooks = this.books$.subscribe();
  }

  public onReadTouched(card: DemiCardConfig<Book>): void {
    this.router.navigate([RoutePath.Reader]);
  }

  public onCardTouched(card: DemiCardConfig<Book>): void {
    this.router.navigate([RoutePath.Detail]);
  }

  ngOnDestroy(): void {
    this.subBooks.unsubscribe();
  }
}
