import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "@interfaces/book.interface";
import { ApiDbRepository } from "@repositories/api-db.repository";

@Injectable({ providedIn: "root" })
export class BookService {
  constructor(private readonly api: ApiDbRepository) {}

  public getBooks$(): Observable<Book[]> {
    return this.api.get("books");
  }
}
