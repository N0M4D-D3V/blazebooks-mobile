import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DemiCardComponent, DemiCardConfig } from 'demiurge';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { BookService } from 'src/app/services/book.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-search',
  template: `
    <div class="d-flex flex-wrap justify-content-around">
      @if(books$ | async; as books){ @for(book of books | search: searchBy;
      track book.id){
      <demi-card [config]="book"></demi-card>
      } }
    </div>
  `,
  styleUrls: [],
  standalone: true,
  imports: [DemiCardComponent, SearchPipe, AsyncPipe],
})
export class SearchPage implements OnInit, OnDestroy {
  private subToolbar!: Subscription;
  private subBooks!: Subscription;

  public books$: Observable<DemiCardConfig[]> = this.bookService.books$;
  public searchBy: string = '';

  constructor(
    private readonly toolbarService: ToolbarService,
    private readonly bookService: BookService
  ) {}

  ngOnInit(): void {
    this.subToolbar = this.toolbarService
      .searchObservable()
      .subscribe((value) => (this.searchBy = value ?? ''));

    this.subBooks = this.books$.subscribe();
  }

  ngOnDestroy(): void {
    this.subBooks.unsubscribe();
    this.subToolbar.unsubscribe();
  }
}
