import { Injectable } from "@angular/core";
import { LocalStorageKey } from "@enum/local-storage.enum";
import { User } from "@interfaces/user.interface";
import { DemiLocalStorageService } from "demiurge";
import { BehaviorSubject, Observable } from "rxjs";
import { LocalDbService } from "./local-db.service";

@Injectable({ providedIn: "root" })
export class AuthService {
  private bsUser: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);

  private $current: Observable<User | undefined> = this.bsUser.asObservable();

  constructor(
    private readonly localStorage: DemiLocalStorageService,
    private readonly localDb: LocalDbService
  ) {}
  public async emailLogin(
    email: string,
    passwd: string
  ): Promise<User | undefined> {
    const usr: User | undefined = await this.localDb.getUserByCredentials({
      email,
      passwd,
    });
    if (usr) this.setUserId(usr);

    return usr;
  }

  public async register(user: User): Promise<string | number | undefined> {
    const exists: boolean =
      (await this.localDb.getUserByCredentials(user)) !== undefined;

    if (exists) throw new Error(`User ${user.email} already exists!`);
    else return this.localDb.updateUser(user);
  }

  public async signOut(): Promise<void> {
    this.unsetUser();
  }

  public $getUser(): Observable<User | undefined> {
    const userID: string | undefined = this.localStorage.get<string>(
      LocalStorageKey.LoggedUserID
    );

    if (userID) {
      this.localDb.getUserById(userID).then((user) => {
        this.bsUser.next(user);
      });
    }

    return this.$current;
  }

  public setUserId(usr: User): void {
    this.localStorage.save(LocalStorageKey.LoggedUserID, usr.id);
    this.bsUser.next(usr);
  }

  public unsetUser(): void {
    this.localStorage.delete(LocalStorageKey.LoggedUserID);
    this.bsUser.next(undefined);
  }
}
