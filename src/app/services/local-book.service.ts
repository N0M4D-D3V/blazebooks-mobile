import { Injectable } from '@angular/core';
import { Book, BookChapter, BookPage } from '@interfaces/book.interface';
import mzJson from '../../assets/books/MZ/mz.json';

@Injectable({ providedIn: 'root' })
export class LocalBookService {
  private mz: Book = mzJson;

  constructor() {}

  public getBook(id: string): Book {
    return this.mz;
  }

  public getChapter(
    bookId: string,
    chapterId?: string
  ): BookChapter | undefined {
    const book: Book = this.getBook(bookId);
    if (!chapterId) return book.chapters![0];

    return book.chapters?.find((chapter) => chapter.id === chapterId);
  }

  public getPage(
    bookId: string,
    chapterId: string,
    pageId?: string
  ): BookPage | undefined {
    const chapter: BookChapter | undefined = this.getChapter(bookId, chapterId);
    if (chapter && pageId) return chapter.pages.find((p) => p.id === pageId);

    return;
  }
}
