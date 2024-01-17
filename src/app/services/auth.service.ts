import { Injectable } from '@angular/core';
import { LocalStorageKey } from '@enum/local-storage.enum';
import { User } from '@interfaces/user.interface';
import { DemiLocalStorageService } from 'demiurge';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private bsUser: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);

  private $current: Observable<User | undefined> = this.bsUser.asObservable();

  constructor(private readonly localStorage: DemiLocalStorageService) {}

  public emailLogin(email: string, pass: string): boolean {
    const isAuth: boolean = email === 'test@test' && pass === 'test';
    if (isAuth) {
      this.setUser({
        email,
      });
    }

    return isAuth;
  }

  public async emailRegister(email: string, pass: string) {
    return false;
  }

  public async signOut(): Promise<void> {
    this.unsetUser();
  }

  public $getUser(): Observable<User | undefined> {
    const usr: User | undefined = this.localStorage.get<User>(
      LocalStorageKey.LoggedUser
    );

    if (usr) this.bsUser.next(usr);

    return this.$current;
  }

  public setUser(usr: User): void {
    this.localStorage.save(LocalStorageKey.LoggedUser, usr);
    this.bsUser.next(usr);
  }

  public unsetUser(): void {
    this.localStorage.delete(LocalStorageKey.LoggedUser);
    this.bsUser.next(undefined);
  }
}
