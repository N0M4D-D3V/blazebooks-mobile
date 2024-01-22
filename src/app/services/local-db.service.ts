import { Injectable } from "@angular/core";
import { LOCAL_DB_CONF } from "@config/db.config";
import { Credentials, User } from "@interfaces/user.interface";
import Dexie, { Table } from "dexie";

@Injectable({
  providedIn: "root",
})
export class LocalDbService extends Dexie {
  private users!: Table<User, string>;

  constructor() {
    super(LOCAL_DB_CONF.name);
    this.version(LOCAL_DB_CONF.version).stores({
      users: "++id,email,passwd",
    });
  }

  public async getUserById(userId: string): Promise<User | undefined> {
    return await this.users.get(userId).catch();
  }

  public async getUserByCredentials(
    credentials: Credentials
  ): Promise<User | undefined> {
    try {
      return await this.users.get({
        email: credentials.email,
        passwd: credentials.passwd,
      });
    } catch (error) {
      console.warn(error);
      return;
    }
  }

  public async updateUser(user: User): Promise<string | number> {
    if (user.id) return this.users.update(user.id, user);
    else return this.users.add(user);
  }

  public async deleteUser(user: User) {
    if (user.id) await this.users.delete(user.id);
    else
      throw new Error(
        `The user ${user.email} can not be deleted because there is no ID!`
      );
  }
}
