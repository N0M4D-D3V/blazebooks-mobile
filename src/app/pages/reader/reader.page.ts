import { AsyncPipe, NgIf, UpperCasePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  BookChapter,
  BookOption,
  BookPage,
  OptionRole,
} from "@interfaces/book.interface";
import { BookControllerService } from "@services/local-book.service";
import { Subscription } from "rxjs";
import { BookStylesDirective } from "@directives/book-styles.directive";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-reader",
  templateUrl: "./reader.page.html",
  styleUrls: ["./reader.page.scss"],
  standalone: true,
  imports: [NgIf, AsyncPipe, UpperCasePipe, BookStylesDirective],
})
export class ReaderPage implements OnInit, OnDestroy {
  private subParam!: Subscription;
  private subChapter!: Subscription;

  public bookId!: string;

  public currentChapter!: BookChapter | undefined;
  public currentPage!: BookPage | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly localBookService: BookControllerService
  ) {}

  ngOnInit(): void {
    this.subParam = this.activatedRoute.params.subscribe((params) => {
      this.bookId = params["id"];
      this.onLoadBook();
    });
  }

  private onLoadBook(): void {
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
      .getChapter(this.bookId, option?.goToPage)
      .subscribe((response) => {
        this.currentChapter = response;
        this.currentPage = this.localBookService.getPage(this.currentChapter);
      });
  }

  private getPage(option?: BookOption): BookPage | undefined {
    return this.localBookService.getPage(this.currentChapter, option?.goToPage);
  }

  ngOnDestroy(): void {
    this.subParam?.unsubscribe();
    this.subChapter?.unsubscribe();
  }
}
