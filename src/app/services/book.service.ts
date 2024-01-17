import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Book } from '@interfaces/book.interface';
import { DemiLocalStorageService } from 'demiurge';
import { LocalStorageKey } from '@enum/local-storage.enum';
import mockDBJson from '../../assets/mock/books-db.json';

@Injectable({ providedIn: 'root' })
export class BookService {
  private sCurrentBook: BehaviorSubject<Book | undefined> = new BehaviorSubject<
    Book | undefined
  >(undefined);
  private currentBook$: Observable<Book | undefined> =
    this.sCurrentBook.asObservable();

  private books: Book[] = mockDBJson.books;
  private currentBook!: Book;

  constructor(private readonly ls: DemiLocalStorageService) {}

  public initCurrentBook(): void {
    this.currentBook =
      this.currentBook ?? this.ls.get<Book>(LocalStorageKey.CurrentBook);

    if (this.currentBook) this.setCurrentBook(this.currentBook);
  }

  public getBooks$(): Observable<Book[]> {
    return of(this.books).pipe(
      map((books: Book[]) => {
        this.books = books;
        if (this.currentBook)
          return books.filter((book) => book.title !== this.currentBook.title);
        else return books;
      })
    );
  }

  public getCurrentBookObservable(): Observable<Book | undefined> {
    return this.currentBook$;
  }

  public setCurrentBook(book: Book): void {
    this.currentBook = { ...book };
    this.ls.save<Book>(LocalStorageKey.CurrentBook, this.currentBook);
    this.sCurrentBook.next(this.currentBook);
  }

  public getBookById(id: string): Book | undefined {
    return this.books?.find((book: Book) => book.id === id);
  }
}
