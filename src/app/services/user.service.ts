import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';
import { User } from '@interfaces/user.interface';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly fireAuth: AngularFireAuth) {}

  public getUser(): Observable<any> {
    return this.fireAuth.authState.pipe(
      map((user: any) => {
        return {
          uid: user?.uid,
          email: user?.email,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          emailVerified: user?.emailVerified,
        } as User;
      })
    );
  }

  public updateUser(conf: { displayName?: string; fotoUrl?: string }): void {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        user.updateProfile({
          displayName: conf.displayName ?? user.displayName,
          photoURL: conf.fotoUrl ?? user.photoURL,
        });
      } else {
        throw new Error('Trying to update user when there is no loged user!');
      }
    });
  }
}
