import { Injectable } from "@angular/core";
import { LocalDbRepository } from "@repositories/local-db.repository";
import { Credentials, User } from "@interfaces/user.interface";

@Injectable({ providedIn: "root" })
export class UserService {
  private get db() {
    return this.localDb.getAllUsers();
  }

  constructor(private readonly localDb: LocalDbRepository) {}

  public async getById(userId: string): Promise<User | undefined> {
    return this.localDb.getAllUsers().get(userId).catch();
  }

  public async getUserByCredentials(
    credentials: Credentials
  ): Promise<User | undefined> {
    try {
      return this.db.get({
        email: credentials.email,
        passwd: credentials.passwd,
      });
    } catch (error) {
      console.warn(error);
      return;
    }
  }

  public async update(user: User): Promise<string | number> {
    if (user.id) return this.db.update(user.id, user);
    else return this.db.add(user);
  }

  public async delete(user: User): Promise<void> {
    if (user.id) return this.db.delete(user.id);
    else
      throw new Error(
        `The user ${user.email} can not be deleted because there is no ID!`
      );
  }
}
