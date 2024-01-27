import { Injectable } from "@angular/core";
import { LOCAL_DB_CONF } from "@config/db.config";
import { Bookmark } from "@interfaces/book.interface";
import Dexie, { Table } from "dexie";

@Injectable({
  providedIn: "root",
})
export class LocalDbRepository extends Dexie {
  private bookmarks!: Table<Bookmark, string>;

  constructor() {
    super(LOCAL_DB_CONF.name);
    this.version(LOCAL_DB_CONF.version).stores(LOCAL_DB_CONF.tables);
  }

  public getBookmarks(): Table<Bookmark, string> {
    return this.bookmarks;
  }
}
