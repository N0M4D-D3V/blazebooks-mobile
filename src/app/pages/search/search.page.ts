import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Book } from '@interfaces/book.interface';
import {
  DemiCardConfig,
  DemiCardListComponent,
  DemiCardSize,
  DemiModalInitialization,
  DemiModalService,
} from 'demiurge';
import { Observable } from 'rxjs';
import { BookService } from '@services/book.service';
import { ModalEnum, getModalConfig } from '@config/modal.config';

@Component({
  selector: 'app-search',
  template: `
    <demi-card-list
      [items$]="books$"
      [config]="configList"
      (onCardTouched)="onCardTouched($event)"
    ></demi-card-list>
  `,
  styleUrls: [],
  standalone: true,
  imports: [DemiCardListComponent, AsyncPipe],
})
export class SearchPage implements OnInit {
  public books$!: Observable<Book[]>;
  public configList: DemiCardConfig = {
    size: DemiCardSize.M,
    isClickable: true,
    canSearch: true,
  };

  constructor(
    private readonly ref: ViewContainerRef,
    private readonly bookService: BookService,
    private readonly demiModal: DemiModalService
  ) {}

  ngOnInit(): void {
    this.demiModal.initModalService(this.ref);
    this.books$ = this.bookService.getBooks$();
  }

  public onCardTouched(book: Book): void {
    const config: DemiModalInitialization = getModalConfig(ModalEnum.Detail);
    this.demiModal.create({ ...config, data: { book: book } });
  }
}
