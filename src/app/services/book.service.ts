import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Book } from '@interfaces/book.interface';
import { MOCK_BOOKS } from './books.mock';

@Injectable({ providedIn: 'root' })
export class BookService {
  private bsCurrentBook: BehaviorSubject<Book> = new BehaviorSubject<Book>({
    ...MOCK_BOOKS[0],
  });
  private bsBooks: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(
    MOCK_BOOKS
  );

  private currentBook$: Observable<Book> = this.bsCurrentBook.asObservable();
  private books$: Observable<Book[]> = this.bsBooks.asObservable();

  private books: Book[] = MOCK_BOOKS;
  private currentBook: Book = { ...MOCK_BOOKS[0] };

  constructor() {}

  public getBooks$(): Observable<Book[]> {
    return this.books$;
  }

  public getCurrentBook$(): Observable<Book> {
    return this.currentBook$;
  }

  public getRelatedBooks(): Book[] {
    return [MOCK_BOOKS[2], MOCK_BOOKS[7], MOCK_BOOKS[3]];
  }

  public setCurrentBook(book: Book): void {
    this.currentBook = { ...book };
    this.bsCurrentBook.next(this.currentBook);
  }

  public setBooks(books: Book[]): void {
    this.books = books;
    this.bsBooks.next(books);
  }
}
