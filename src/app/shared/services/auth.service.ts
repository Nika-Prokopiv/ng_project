import {Injectable} from '@angular/core';

@Injectable()

export class AuthService {

  private isAuthenticated = false;

  constructor() {
  }

  logIn() {
    this.isAuthenticated = true;
  }

  logOut() {
    this.isAuthenticated = false;
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
