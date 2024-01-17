import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { DemiLocalStorageService } from 'demiurge';
import { LocalStorageKey } from '@enum/local-storage.enum';
import { User } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
class AuthGuard {
  constructor(private readonly localstorage: DemiLocalStorageService) {}

  canActivate(): boolean {
    const isAuth: User | undefined = this.localstorage.get<User>(
      LocalStorageKey.LoggedUser
    );

    return isAuth !== undefined;
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate();
};
