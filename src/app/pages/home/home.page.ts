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
import { Observable, Subscription } from "rxjs";
import { BookService } from "@services/book.service";
import { AsyncPipe } from "@angular/common";
import { Book } from "@interfaces/book.interface";
import { Router } from "@angular/router";
import { RoutePath } from "@enum/route.enum";
import { ModalEnum, getModalConfig } from "@config/modal.config";
import { AuthService } from "@services/auth.service";
import { User } from "@interfaces/user.interface";
import { UserService } from "@services/user.service";

@Component({
  selector: "app-home",
  template: `
    <div class="container">
      @if($user | async; as usr){ @if(usr.lastOpened; as lastOpened){
      <demi-card-img
        [item]="lastOpened"
        [config]="mainCardConfig"
        (onReadTouched)="onReadTouched($event)"
        (onCardTouched)="onCardTouched($event)"
      ></demi-card-img>
      } }

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
  private subUser!: Subscription;

  public $user!: Observable<User | undefined>;
  public books$!: Observable<Book[]>;

  private user?: User;

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
    private readonly auth: AuthService,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.demiModal.initModalService(this.ref);

    this.books$ = this.bookService.getBooks$();
    this.$user = this.auth.$getUser();

    this.subUser = this.$user.subscribe((usr) => (this.user = usr));
  }

  public async onReadTouched(book: Book): Promise<void> {
    if (this.user) {
      this.user.lastOpened = book;
      await this.userService.update(this.user);
      this.router.navigate([RoutePath.Reader]);
    }
  }

  public onCardTouched(book: Book): void {
    const config: DemiModalInitialization = getModalConfig(ModalEnum.Detail);
    this.demiModal.create({ ...config, data: { book: book } });
  }

  ngOnDestroy(): void {
    this.subUser.unsubscribe();
  }
}
