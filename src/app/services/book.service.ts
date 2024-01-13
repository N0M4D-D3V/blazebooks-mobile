import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Book } from '@interfaces/book.interface';
import { FirestoreRepository } from '../repositories/firestore.repository';
import { FirestoreCollection } from '@enum/firestore.collection.enum';
import { DemiLocalStorageService } from 'demiurge';
import { LocalStorageKey } from '@enum/local-storage.enum';

@Injectable({ providedIn: 'root' })
export class BookService {
  private sCurrentBook: BehaviorSubject<Book | undefined> = new BehaviorSubject<
    Book | undefined
  >(undefined);
  private currentBook$: Observable<Book | undefined> =
    this.sCurrentBook.asObservable();

  private books!: Book[];
  private currentBook!: Book;

  constructor(
    private readonly fireRep: FirestoreRepository,
    private readonly ls: DemiLocalStorageService
  ) {}

  public initCurrentBook(): void {
    this.currentBook =
      this.currentBook ?? this.ls.get<Book>(LocalStorageKey.CurrentBook);

    if (this.currentBook) this.setCurrentBook(this.currentBook);
  }

  public getBooks$(): Observable<Book[]> {
    return this.fireRep
      .getCollectionData<Book[]>(FirestoreCollection.Books)
      .pipe(
        map((books: Book[]) => {
          this.books = books;
          if (this.currentBook)
            return books.filter(
              (book) => book.title !== this.currentBook.title
            );
          else return books;
        })
      );
  }

  public getCurrentBookObservable(): Observable<Book | undefined> {
    return this.currentBook$;
  }

  public getRelatedBooks(): Observable<Book[]> {
    return this.fireRep
      .getCollectionData<Book[]>(FirestoreCollection.Books)
      .pipe(map((array) => array.slice(0, 3)));
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
