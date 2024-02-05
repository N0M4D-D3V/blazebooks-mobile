import { Injectable } from "@angular/core";
import { LastReaded } from "@interfaces/book.interface";
import { LocalDbRepository } from "@repositories/local-db.repository";
import { Table } from "dexie";

@Injectable({ providedIn: "root" })
export class LastReadedService {
  private get table(): Table<LastReaded, string> {
    return this.localRepo.getLastReadedTable();
  }

  constructor(private readonly localRepo: LocalDbRepository) {}

  public async getById(userId: string): Promise<LastReaded | undefined> {
    return this.table.get({
      userId: userId,
    });
  }

  public async update(last: LastReaded): Promise<any> {
    const exists: boolean = (await this.getById(last.userId)) !== undefined;

    if (exists) return this.table.update(last.userId, last);
    else return this.table.add(last);
  }
}
