import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import {
  BsIcon,
  DemiCardConfig,
  DemiCardImgComponent,
  DemiCardListComponent,
  DemiCardSize,
  DemiModalInitialization,
  DemiModalService,
} from 'demiurge';
import { Observable } from 'rxjs';
import { BookService } from '@services/book.service';
import { AsyncPipe } from '@angular/common';
import { Book } from '@interfaces/book.interface';
import { Router } from '@angular/router';
import { RoutePath } from '@enum/route.enum';
import { ModalEnum, getModalConfig } from '@config/modal.config';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
      @if(currentBook$ | async; as current){
      <demi-card-img
        [item]="current"
        [config]="mainCardConfig"
        (onReadTouched)="onReadTouched($event)"
        (onCardTouched)="onCardTouched($event)"
      ></demi-card-img>
      }

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
  public currentBook$!: Observable<Book | undefined>;
  public books$!: Observable<Book[]>;

  public mainCardConfig: DemiCardConfig = {
    isClickable: true,
    icon: BsIcon.Play,
  };
  public cardListConfig: DemiCardConfig = {
    size: DemiCardSize.M,
    isClickable: true,
    canSearch: true,
  };

  constructor(
    private readonly ref: ViewContainerRef,
    private readonly router: Router,
    private readonly demiModal: DemiModalService,
    private readonly bookService: BookService
  ) {}

  ngOnInit(): void {
    this.demiModal.initModalService(this.ref);

    this.bookService.initCurrentBook();
    this.currentBook$ = this.bookService.getCurrentBookObservable();

    this.books$ = this.bookService.getBooks$();
  }

  public onReadTouched(book: Book): void {
    this.bookService.setCurrentBook(book);
    this.router.navigate([RoutePath.Reader]);
  }

  public onCardTouched(book: Book): void {
    const config: DemiModalInitialization = getModalConfig(ModalEnum.Detail);
    this.demiModal.create({ ...config, data: { book: book } });
  }

  ngOnDestroy(): void {}
}
