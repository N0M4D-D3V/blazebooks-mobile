import { Injectable } from '@angular/core';
import { DemiCardConfig } from 'demiurge';
import { Observable, of } from 'rxjs';
import { Book } from '@interfaces/book.interface';
import { MOCK_BOOKS } from './books.mock';

@Injectable({ providedIn: 'root' })
export class BookService {
  public currentBook$: Observable<DemiCardConfig<Book>> = of({
    ...MOCK_BOOKS[0],
  });
  public books$: Observable<DemiCardConfig<Book>[]> = of(MOCK_BOOKS);

  private currentBook: DemiCardConfig<Book> = { ...MOCK_BOOKS[0] };

  constructor() {}

  public getCurrentBook(): DemiCardConfig<Book> {
    return this.currentBook;
  }

  public getRelatedBooks(): DemiCardConfig<Book>[] {
    return [MOCK_BOOKS[2], MOCK_BOOKS[7], MOCK_BOOKS[2]];
  }
}
