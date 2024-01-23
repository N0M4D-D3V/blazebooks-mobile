import { Injectable } from "@angular/core";
import { User, UserConfig } from "@interfaces/user.interface";
import { LocalDbRepository } from "@repositories/local-db.repository";

@Injectable({
  providedIn: "root",
})
export class UserConfigService {
  private get db() {
    return this.localDb.getAllUserConfigs();
  }

  constructor(private readonly localDb: LocalDbRepository) {}

  public async getByUserId(userId: string): Promise<UserConfig | undefined> {
    try {
      return this.db.get({
        userId: userId,
      });
    } catch (err) {
      console.warn(err);
      return;
    }
  }

  public async update(conf: UserConfig): Promise<any> {
    if (conf.id) return this.db.update(conf.id, conf);
    else return this.db.add(conf);
  }

  public async delete(conf: UserConfig): Promise<void> {
    if (conf.id) this.db.delete(conf.id);
    else
      throw new Error(
        `Config for current user can not be deleted. There is no ID!`
      );
  }
}
