import { Component, OnDestroy, OnInit } from '@angular/core';
import { DemiCardComponent, DemiCardConfig } from 'demiurge';
import { Observable, Subscription } from 'rxjs';
import { BookService } from '@services/book.service';
import { ToolbarService } from '@services/toolbar.service';
import { SearchPipe } from '@pipes/search.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: [],
  standalone: true,
  imports: [AsyncPipe, SearchPipe, DemiCardComponent],
})
export class HomePage implements OnInit, OnDestroy {
  private subToolbar!: Subscription;
  private subBooks!: Subscription;

  public currentBook$: Observable<DemiCardConfig> =
    this.bookService.currentBook$;
  public books$: Observable<DemiCardConfig[]> = this.bookService.books$;
  public searchValue: string = '';

  constructor(
    private readonly toolbarService: ToolbarService,
    private readonly bookService: BookService
  ) {}

  ngOnInit(): void {
    this.subToolbar = this.toolbarService
      .searchObservable()
      .subscribe((value) => (this.searchValue = value ?? ''));

    this.subBooks = this.books$.subscribe();
  }

  ngOnDestroy(): void {
    this.subToolbar.unsubscribe();
    this.subBooks.unsubscribe();
  }
}
