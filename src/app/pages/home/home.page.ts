import { Component, OnDestroy, OnInit, ViewContainerRef } from "@angular/core";
import {
  BsIcon,
  DemiCardConfig,
  DemiCardImgComponent,
  DemiCardListComponent,
  DemiCardSize,
  DemiModalInitialization,
  DemiModalService,
} from "demiurge";
import { Observable } from "rxjs";
import { BookService } from "@services/book.service";
import { AsyncPipe } from "@angular/common";
import { Book, LastReaded } from "@interfaces/book.interface";
import { Router } from "@angular/router";
import { RoutePath } from "@enum/route.enum";
import { ModalEnum, getModalConfig } from "@config/modal.config";
import { LastReadedService } from "@services/last-readed.service";
import { DEFAULT_USER_ID } from "@config/db.config";

@Component({
  selector: "app-home",
  template: `
    <div class="container">
      @if(lastBook){
      <demi-card-img
        [item]="lastBook"
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
  public books$!: Observable<Book[]>;
  public lastBook?: Book;

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
    private readonly bookService: BookService,
    private readonly lastReadedService: LastReadedService
  ) {}

  ngOnInit(): void {
    this.demiModal.initModalService(this.ref);

    this.books$ = this.bookService.getBooks$();
    this.books$.subscribe(console.log);
    this.getLastBook();
  }

  private async getLastBook(): Promise<void> {
    const last: LastReaded | undefined = await this.lastReadedService.getById(
      DEFAULT_USER_ID
    );
    if (last) this.lastBook = last.book;
  }

  public onReadTouched(book: Book): void {
    this.router.navigate([RoutePath.Reader, book.id]);
  }

  public onCardTouched(book: Book): void {
    const config: DemiModalInitialization = getModalConfig(ModalEnum.Detail);
    this.demiModal.create({ ...config, data: { book: book } });
  }

  ngOnDestroy(): void {}
}
