import { Injectable } from "@angular/core";
import { LOCAL_DB_CONF } from "@config/db.config";
import { User, UserConfig } from "@interfaces/user.interface";
import Dexie, { Table } from "dexie";

@Injectable({
  providedIn: "root",
})
export class LocalDbRepository extends Dexie {
  private users!: Table<User, string>;
  private userConfigs!: Table<UserConfig, string>;

  constructor() {
    super(LOCAL_DB_CONF.name);
    this.version(LOCAL_DB_CONF.version).stores(LOCAL_DB_CONF.tables);
  }

  public getAllUsers(): Table<User, string> {
    return this.users;
  }

  public getUserConfigs(): Table<UserConfig, string> {
    return this.userConfigs;
  }
}
