import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Book, BookChapter, BookPage } from "@interfaces/book.interface";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class BookControllerService {
  private path: string = "assets/books";

  constructor(private readonly http: HttpClient) {}

  public getChapter(
    bookId: string,
    chapterId?: string
  ): Observable<BookChapter> {
    if (chapterId)
      return this.http.get<BookChapter>(
        `${this.path}/${bookId}/chapters/${chapterId}.json`
      );
    else {
      return this.http.get<BookChapter>(
        `${this.path}/${bookId}/chapters/chapter1.json`
      );
    }
  }

  public getPage(chapter?: BookChapter, pageId?: string): BookPage | undefined {
    if (chapter && pageId) return chapter.pages.find((p) => p.id === pageId);
    return;
  }
}
