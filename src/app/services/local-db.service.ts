import { Injectable } from "@angular/core";
import { User } from "@interfaces/user.interface";
import Dexie, { Table } from "dexie";

@Injectable({
  providedIn: "root",
})
export class LocalDbService extends Dexie {
  private users!: Table<User, string>;

  constructor() {
    super("blazebooks-local-db");
    this.version(0).stores({
      users: "++id",
    });
  }

  public async getUser(userId: string): Promise<User | undefined> {
    return await this.users.get(userId);
  }

  public async updateUser(user: User) {
    if (user.id) await this.users.update(user.id, user);
    else await this.users.add(user);
  }

  public async deleteUser(user: User) {
    if (user.id) await this.users.delete(user.id);
    else
      throw new Error(
        `The user ${user.email} can not be deleted because there is no ID!`
      );
  }
}
