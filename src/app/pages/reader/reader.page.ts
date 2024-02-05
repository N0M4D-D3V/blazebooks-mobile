import { AsyncPipe, NgIf, UpperCasePipe } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  BookChapter,
  BookOption,
  BookPage,
  Bookmark,
  OptionRole,
} from "@interfaces/book.interface";
import { BookControllerService } from "@services/local-book.service";
import { Subscription } from "rxjs";
import { BookStylesDirective } from "@directives/book-styles.directive";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { BookmarkService } from "@services/bookmark.service";
import { DEFAULT_USER_ID } from "@config/db.config";

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

  public bookmark: Bookmark = {
    userId: DEFAULT_USER_ID,
    bookId: "",
    chapterId: "",
  };

  public currentChapter!: BookChapter | undefined;
  public currentPage!: BookPage | undefined;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly localBookService: BookControllerService,
    private readonly bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {
    this.subParam = this.activatedRoute.params.subscribe(async (params) => {
      await this.loadBookmark(params["id"]);
      this.onLoadBook();
    });
  }

  private async loadBookmark(bookId: string): Promise<void> {
    const mark: Bookmark | undefined = await this.bookmarkService.getById({
      userId: DEFAULT_USER_ID,
      bookId,
    });

    if (mark) this.bookmark = mark;
    else this.bookmark.bookId = bookId;
  }

  private onLoadBook(): void {
    this.getChapter();
  }

  public loadPage(option: BookOption): void {
    if (!option.role) this.currentPage = this.getPage(option);
    else if (option.role === OptionRole.End) {
      this.bookmark.chapterId = option.goToPage;
      this.getChapter();
    }
  }

  public async onBack(): Promise<void> {
    await this.bookmarkService.update(this.bookmark);
    this.location.back();
  }

  private getChapter(): void {
    this.subChapter = this.localBookService
      .getChapter(this.bookmark)
      .subscribe((response) => {
        this.currentChapter = response;
        this.bookmark.chapterId = response.id;
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
