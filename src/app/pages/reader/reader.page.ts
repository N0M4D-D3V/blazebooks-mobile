import {
  AsyncPipe,
  NgClass,
  NgIf,
  NgStyle,
  UpperCasePipe,
} from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Book, Bookmark, LastReaded, Page } from "@interfaces/book.interface";
import { Observable, Subscription, tap } from "rxjs";
import { BookStylesDirective } from "@directives/book-styles.directive";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
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

  private book!: Book;
  public page$!: Observable<Page>;

  public bookmark: Bookmark = {
    userId: DEFAULT_USER_ID,
    bookId: "",
    chapterId: 0,
  };

  public config: Config = this.configService.get();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly lastReadedService: LastReadedService,
    private readonly bookmarkService: BookmarkService,
    private readonly pageService: PageService,
    private readonly configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.subParam = this.activatedRoute.params.subscribe(async (params) => {
      await this.getBookmark(params["id"]);
      await this.getBook();
      await this.getPage();
    });
  }

  private async getBookmark(bookId: string): Promise<void> {
    const mark: Bookmark | undefined = await this.bookmarkService.getById({
      userId: DEFAULT_USER_ID,
      bookId,
    });

    if (mark) this.bookmark = mark;
    else this.bookmark.bookId = bookId;
  }

  private async getBook(): Promise<void> {
    const lastReaded: LastReaded | undefined =
      await this.lastReadedService.getById(DEFAULT_USER_ID);
    this.book = lastReaded!.book;
  }

  public async getPage(id?: number): Promise<void> {
    if (id && this.checkId(id)) this.page$ = this.pageService.getPage(id);
    else {
      const chapter: number = this.bookmark?.chapterId ?? 0;
      const page: number = 0;
      console.log(this.book.content);
      const firstPage: number = this.book.content[chapter][page];
      this.page$ = this.pageService.getPage(firstPage).pipe(tap(console.log));
    }
  }

  public async onBack(): Promise<void> {
    await this.bookmarkService.update(this.bookmark);
    this.location.back();
  }

  private checkId(id?: number): boolean {
    const chapter: number = this.bookmark.chapterId;
    const check = id && this.book.content[chapter].includes(id);
    return check ? true : false;
  }

  ngOnDestroy(): void {
    this.subParam?.unsubscribe();
  }
}
