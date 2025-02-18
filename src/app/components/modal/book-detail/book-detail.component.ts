import { AsyncPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '@interfaces/book.interface';
import { RoutePath } from '@enum/route.enum';
import { BookService } from '@services/book.service';
import {
  BsIcon,
  DemiCardConfig,
  DemiCardImgComponent,
  DemiCardListComponent,
  DemiCardSize,
  DemiModalService,
  DemiSeparePipe,
} from 'demiurge';

@Component({
  selector: 'app-book-detail',
  template: `
    <a class="btn btn-dark btn-detail-close" (click)="onClose()">X</a>
    @if (book) {
    <demi-card-img
      [item]="book"
      (onReadTouched)="onRead($event)"
      [config]="cardConfig"
    ></demi-card-img>

    <div class="px-3 fadein">
      <p class="text-primary text-end">
        <b>Géneros: </b> {{ book.genres | separe }}
      </p>
      <h5 class="text-primary">Sinopsis</h5>
      <div class="container">
        <p>{{ book.description }}</p>
      </div>
    </div>
    }
  `,
  styleUrls: ['./book-detail.component.scss'],
  standalone: true,
  imports: [
    DemiCardListComponent,
    DemiCardImgComponent,
    DemiSeparePipe,
    AsyncPipe,
  ],
})
export class BookDetailComponent implements OnInit {
  @Input() book!: Book;

  public cardConfig: DemiCardConfig = {
    isClickable: true,
    size: DemiCardSize.S,
    icon: BsIcon.Play,
  };

  constructor(
    private readonly router: Router,
    private readonly demiModal: DemiModalService,
    private readonly bookService: BookService
  ) {}

  ngOnInit(): void {}

  public onClose(): void {
    this.demiModal.close();
  }

  public onRead(book: Book): void {
    this.bookService.setCurrentBook(book);
    this.router.navigate([RoutePath.Reader]);
  }
}
