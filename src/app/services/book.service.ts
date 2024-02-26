import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Book } from "@interfaces/book.interface";
import { ApiDbRepository } from "@repositories/api-db.repository";
import { Links } from "@enum/links.enum";

@Injectable({ providedIn: "root" })
export class BookService {
  private url: string = Links.API;

  constructor(private readonly api: ApiDbRepository) {}

  public getBooks$(): Observable<Book[]> {
    return this.api.get<Book[]>("books").pipe(
      map((books: Book[]) =>
        books.map((book) => {
          return { ...book, imgUrl: `${this.url}/books/cover/${book.imgUrl}` };
        })
      )
    );
  }
}
