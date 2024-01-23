import { AsyncPipe, NgIf, UpperCasePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  Book,
  BookChapter,
  BookOption,
  BookPage,
  OptionRole,
} from "@interfaces/book.interface";
import { RoutePath } from "@enum/route.enum";
import { BookControllerService } from "@services/local-book.service";
import { Observable, Subscription, map } from "rxjs";
import { BookStylesDirective } from "@directives/book-styles.directive";
import { Location } from "@angular/common";
import { AuthService } from "@services/auth.service";

@Component({
  selector: "app-reader",
  templateUrl: "./reader.page.html",
  styleUrls: ["./reader.page.scss"],
  standalone: true,
  imports: [NgIf, AsyncPipe, UpperCasePipe, BookStylesDirective],
})
export class ReaderPage implements OnInit, OnDestroy {
  private subBook!: Subscription;
  private subChapter!: Subscription;
  private book$!: Observable<Book | undefined>;

  public currentBook!: Book;
  public currentChapter!: BookChapter | undefined;
  public currentPage!: BookPage | undefined;

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly localBookService: BookControllerService,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {
    this.book$ = this.auth.$getUser().pipe(map((res) => res?.lastOpened));

    this.subBook = this.book$.subscribe((book: Book | undefined) => {
      if (!book) this.router.navigate([RoutePath.Home]);
      else this.onLoadBook(book);
    });
  }

  private onLoadBook(book: Book): void {
    this.currentBook = book;
    this.getChapter();
  }

  public loadPage(option: BookOption): void {
    if (!option.role) this.currentPage = this.getPage(option);
    else if (option.role === OptionRole.End) this.getChapter(option);
  }

  public onBack(): void {
    this.location.back();
  }

  private getChapter(option?: BookOption): void {
    this.subChapter = this.localBookService
      .getChapter(this.currentBook, option?.goToPage)
      .subscribe((response) => {
        this.currentChapter = response;
        this.currentPage = this.localBookService.getPage(this.currentChapter);
      });
  }

  private getPage(option?: BookOption): BookPage | undefined {
    return this.localBookService.getPage(this.currentChapter, option?.goToPage);
  }

  ngOnDestroy(): void {
    this.subBook?.unsubscribe();
    this.subChapter?.unsubscribe();
  }
}
