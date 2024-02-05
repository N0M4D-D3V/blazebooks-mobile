import { Injectable } from "@angular/core";
import { Bookmark } from "@interfaces/book.interface";
import { LocalDbRepository } from "@repositories/local-db.repository";
import { Table } from "dexie";

@Injectable({ providedIn: "root" })
export class BookmarkService {
  private get table(): Table<Bookmark, string> {
    return this.localRepo.getBookmarkTable();
  }

  constructor(private readonly localRepo: LocalDbRepository) {}

  public async getById(query: {
    userId: string;
    bookId: string;
  }): Promise<Bookmark | undefined> {
    return this.table.get({
      userId: query.userId,
      bookId: query.bookId,
    });
  }

  public async update(bookmark: Bookmark): Promise<any> {
    return this.table.put(bookmark);
  }
}
