import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Book } from '@interfaces/book.interface';
import { FirestoreRepository } from '../repositories/firestore.repository';
import { FirestoreCollection } from '@enum/firestore.collection.enum';

@Injectable({ providedIn: 'root' })
export class BookService {
  private currentBook!: Book;

  constructor(private fireRep: FirestoreRepository) {}

  public getBooks$(): Observable<Book[]> {
    return this.fireRep
      .getCollectionData<Book[]>(FirestoreCollection.Books)
      .pipe(
        map((books: Book[]) => {
          if (this.currentBook)
            return books.filter(
              (book) => book.title !== this.currentBook.title
            );
          else return books;
        })
      );
  }

  public getCurrentBook(): Book {
    return this.currentBook;
  }

  public getRelatedBooks(): Observable<Book[]> {
    return this.fireRep
      .getCollectionData<Book[]>(FirestoreCollection.Books)
      .pipe(map((array) => array.slice(0, 3)));
  }

  public setCurrentBook(book: Book): void {
    this.currentBook = { ...book };
  }
}
