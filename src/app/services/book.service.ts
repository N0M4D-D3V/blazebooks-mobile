import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '@interfaces/book.interface';
import { MOCK_BOOKS } from './books.mock';

@Injectable({ providedIn: 'root' })
export class BookService {
  public currentBook$: Observable<Book> = of({
    ...MOCK_BOOKS[0],
  });
  public books$: Observable<Book[]> = of(MOCK_BOOKS);

  private currentBook: Book = { ...MOCK_BOOKS[0] };

  constructor() {}

  public getCurrentBook(): Book {
    return this.currentBook;
  }

  public getRelatedBooks(): Book[] {
    return [MOCK_BOOKS[2], MOCK_BOOKS[7], MOCK_BOOKS[2]];
  }
}
