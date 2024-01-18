import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '@interfaces/book.interface';
import mockDBJson from '../../assets/mock/books-db.json';

@Injectable({ providedIn: 'root' })
export class BookService {
  private books: Book[] = mockDBJson.books;

  constructor() {}

  public getBooks$(): Observable<Book[]> {
    return of(this.books);
  }
}
