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
import { Observable, Subscription, map, of } from "rxjs";
import { BookService } from "@services/book.service";
import { AsyncPipe } from "@angular/common";
import { Book } from "@interfaces/book.interface";
import { Router } from "@angular/router";
import { RoutePath } from "@enum/route.enum";
import { ModalEnum, getModalConfig } from "@config/modal.config";
import { User } from "@interfaces/user.interface";

@Component({
  selector: "app-home",
  template: `
    <div class="container">
      @if($lastBook | async; as lstBook){
      <demi-card-img
        [item]="lstBook"
        [config]="mainCardConfig"
        (onReadTouched)="onReadTouched($event)"
        (onCardTouched)="onCardTouched($event)"
      ></demi-card-img>
      }

      <demi-card-list
        [items$]="$books"
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
  public $books!: Observable<Book[]>;
  public $lastBook!: Observable<Book | undefined>;

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

    this.$books = this.bookService.getBooks$();
    //this.$user = this.auth.$getUser();

    //this.subUser = this.$user.subscribe((usr) => {
    //this.user = usr;
    // this.$lastBook = of(this.userConfig.getByUser(this.user)).pipe(
    //   map((res: any) => res?.lastBook)
    // );
    //});
  }

  public async onReadTouched(book: Book): Promise<void> {
    // console.log(book);
    // this.demiModal
    //   .close()
    //   .then(() => this.router.navigate([RoutePath.Reader, book.id]));
  }

  public onCardTouched(book: Book): void {
    const config: DemiModalInitialization = getModalConfig(ModalEnum.Detail);
    this.demiModal.create({ ...config, data: { book: book } });
  }

  ngOnDestroy(): void {}
}
