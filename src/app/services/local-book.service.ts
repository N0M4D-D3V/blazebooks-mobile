import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, BookChapter, BookPage } from '@interfaces/book.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalBookService {
  constructor(private readonly http: HttpClient) {}

  public getChapter(book: Book, chapterId?: string): Observable<BookChapter> {
    if (chapterId)
      return this.http.get<BookChapter>(
        `assets/books/${book.id}/chapters/${chapterId}.json`
      );
    else {
      const chapters: string[] = book.chapterIDs;
      return this.http.get<BookChapter>(
        `assets/books/${book.id}/chapters/${chapters[0]}.json`
      );
    }
  }

  public getPage(chapter: BookChapter, pageId?: string): BookPage | undefined {
    if (chapter && pageId) return chapter.pages.find((p) => p.id === pageId);
    return;
  }
}
