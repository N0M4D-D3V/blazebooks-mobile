import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DemiCardComponent,
  DemiCardConfig,
  DemiCardListComponent,
} from 'demiurge';
import { Observable, Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-search',
  template: `
    <demi-card-list [config$]="books$" [canSearch]="true"></demi-card-list>
  `,
  styleUrls: [],
  standalone: true,
  imports: [DemiCardListComponent, AsyncPipe],
})
export class SearchPage implements OnInit, OnDestroy {
  private subBooks!: Subscription;
  public books$: Observable<DemiCardConfig[]> = this.bookService.books$;

  constructor(private readonly bookService: BookService) {}

  ngOnInit(): void {
    this.subBooks = this.books$.subscribe();
  }

  ngOnDestroy(): void {
    this.subBooks.unsubscribe();
  }
}
