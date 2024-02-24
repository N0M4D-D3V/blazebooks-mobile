import {
  AsyncPipe,
  NgClass,
  NgIf,
  NgStyle,
  UpperCasePipe,
} from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  Book,
  Bookmark,
  LastReaded,
  OptionRole,
  Page,
} from "@interfaces/book.interface";
import { Observable, Subscription, tap } from "rxjs";
import { BookStylesDirective } from "@directives/book-styles.directive";
import { Location } from "@angular/common";
import { ActivatedRoute, Params } from "@angular/router";
import { BookmarkService } from "@services/bookmark.service";
import { DEFAULT_USER_ID } from "@config/db.config";
import { ConfigService } from "@services/config.service";
import { Config } from "@interfaces/config.interface";
import { LastReadedService } from "@services/last-readed.service";
import { PageService } from "@services/page.service";
import { HtmlInjectorDirective } from "@directives/html-injector.directive";

@Component({
  selector: "app-reader",
  templateUrl: "./reader.page.html",
  styleUrls: ["./reader.page.scss"],
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    AsyncPipe,
    UpperCasePipe,
    BookStylesDirective,
    HtmlInjectorDirective,
  ],
})
export class ReaderPage implements OnInit, OnDestroy {
  private subParam!: Subscription;

  public page$!: Observable<Page>;

  public config: Config = this.configService.get();
  public bookmark: Bookmark = {
    userId: DEFAULT_USER_ID,
    bookId: "",
    chapterId: "0",
  };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly lastReadedService: LastReadedService,
    private readonly bookmarkService: BookmarkService,
    private readonly pageService: PageService,
    private readonly configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.subParam = this.activatedRoute.params.subscribe(
      async (params) => await this.start(params)
    );
  }

  public async getNext(ref?: string): Promise<void> {
    const isEnd: boolean = this.manageEndBook(ref);
    if (isEnd) return;

    this.manageNextChapter(ref);
    this.manageNextPage(ref);
  }

  public async onBack(): Promise<void> {
    await this.bookmarkService.update(this.bookmark);
    this.location.back();
  }

  private async start(params: Params): Promise<void> {
    await this.getBookmark(params["id"]);
    await this.getNext();
  }

  private async getBookmark(bookId: string): Promise<void> {
    const mark: Bookmark | undefined = await this.bookmarkService.getById({
      userId: DEFAULT_USER_ID,
      bookId,
    });

    if (mark) this.bookmark = mark;
    else this.bookmark.bookId = bookId;
  }

  private manageNextPage(ref?: string): void {
    ref = `${this.bookmark.bookId}${this.bookmark.chapterId}${ref ?? 0}`;
    this.page$ = this.pageService.getPage(ref);
  }

  private manageNextChapter(ref?: string): void {
    if (ref && ref === OptionRole.Next) {
      let current: number = +this.bookmark.chapterId;
      this.bookmark.bookId = (++current).toString();
    }
  }

  private manageEndBook(ref?: string): boolean {
    return ref === OptionRole.End;
  }

  ngOnDestroy(): void {
    this.subParam?.unsubscribe();
  }
}
