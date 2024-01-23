import { Injectable } from "@angular/core";
import { LocalDbRepository } from "@repositories/local-db.repository";
import { Credentials, User } from "@interfaces/user.interface";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private readonly localDb: LocalDbRepository) {}

  public async getUserById(userId: string): Promise<User | undefined> {
    return await this.localDb.getAllUsers().get(userId).catch();
  }

  public async getUserByCredentials(
    credentials: Credentials
  ): Promise<User | undefined> {
    try {
      return await this.localDb.getAllUsers().get({
        email: credentials.email,
        passwd: credentials.passwd,
      });
    } catch (error) {
      console.warn(error);
      return;
    }
  }

  public async updateUser(user: User): Promise<string | number> {
    if (user.id) return this.localDb.getAllUsers().update(user.id, user);
    else return this.localDb.getAllUsers().add(user);
  }

  public async deleteUser(user: User) {
    if (user.id) await this.localDb.getAllUsers().delete(user.id);
    else
      throw new Error(
        `The user ${user.email} can not be deleted because there is no ID!`
      );
  }
}
