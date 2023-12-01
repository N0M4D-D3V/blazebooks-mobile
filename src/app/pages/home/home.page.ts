import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DemiCardComponent,
  DemiCardConfig,
  DemiCardListComponent,
} from 'demiurge';
import { Observable, Subscription } from 'rxjs';
import { BookService } from '@services/book.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      @if(currentBook$ | async; as current){
      <demi-card [config]="current"></demi-card>
      }

      <demi-card-list [config$]="books$" [canSearch]="true"></demi-card-list>
    </div>
  `,
  styleUrls: [],
  standalone: true,
  imports: [AsyncPipe, DemiCardComponent, DemiCardListComponent],
})
export class HomePage implements OnInit, OnDestroy {
  private subBooks!: Subscription;

  public currentBook$: Observable<DemiCardConfig> =
    this.bookService.currentBook$;
  public books$: Observable<DemiCardConfig[]> = this.bookService.books$;

  constructor(private readonly bookService: BookService) {}

  ngOnInit(): void {
    this.subBooks = this.books$.subscribe();
  }

  ngOnDestroy(): void {
    this.subBooks.unsubscribe();
  }
}
