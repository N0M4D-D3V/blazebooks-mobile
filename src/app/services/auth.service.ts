import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly fireAuth: AngularFireAuth) {}

  public async emailLogin(email: string, pass: string): Promise<any> {
    return this.fireAuth.signInWithEmailAndPassword(email, pass);
  }

  public async googleLogin(): Promise<any> {
    return this.fireAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  public async emailRegister(email: string, pass: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, pass);
  }

  public async signOut(): Promise<void> {
    this.fireAuth.signOut();
  }
}
