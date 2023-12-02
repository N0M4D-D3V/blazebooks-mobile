import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '@interfaces/book.interface';
import { DemiCardConfig, DemiCardListComponent, DemiCardSize } from 'demiurge';
import { Observable, Subscription, map } from 'rxjs';
import { BookService } from '@services/book.service';
import { Router } from '@angular/router';
import { RoutePath } from '@interfaces/route.interface';

@Component({
  selector: 'app-search',
  template: `
    <demi-card-list
      [config$]="books$"
      [canSearch]="true"
      (onCardTouched)="onCardTouched($event)"
    ></demi-card-list>
  `,
  styleUrls: [],
  standalone: true,
  imports: [DemiCardListComponent, AsyncPipe],
})
export class SearchPage implements OnInit, OnDestroy {
  private subBooks!: Subscription;
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

  public onCardTouched(card: DemiCardConfig<Book>): void {
    this.router.navigate([RoutePath.Detail]);
  }

  ngOnDestroy(): void {
    this.subBooks.unsubscribe();
  }
}
