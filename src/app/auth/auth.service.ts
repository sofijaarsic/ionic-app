import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import {tap} from "rxjs";
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

export interface UserData {
  name?: string;
  surname?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isUserAuthenticated = false;
  user: User;
  constructor(private http: HttpClient) { }

  get isUserAuthenticated(): boolean {
    if (this.user) {
      return !!this.user.token;
    } else {
      return false;
    }
  }
  logIn(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
        environment.firebaseApiKey
      }`,
      { email: user.email, password: user.password, returnSecureToken: true }).pipe(
      tap((userData) => {
        const expirationTime = new Date(
           new Date().getTime()+ +userData.expiresIn * 1000
        );
        const user = new User(
          userData.localId,
          userData.email,
          userData.idToken,
          expirationTime
        );
        this.user = user;
      })
    );
  }

  register(user: UserData) {
    this._isUserAuthenticated = true;
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
        environment.firebaseApiKey
      }`,
      { email: user.email, password: user.password, returnSecureToken: true }
    );
  }
  logOut() {
    this.user = null;
  }
  getToken() {
    return this.user.token;
  }
  getUserId() {
    return this.user.id;
  }
}
