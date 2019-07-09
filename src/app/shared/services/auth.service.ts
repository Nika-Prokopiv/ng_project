import {Injectable} from '@angular/core';

@Injectable()

export class AuthService {

  private isAuthenticated = true;

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
    console.log('logged in ', this.isAuthenticated);
    return this.isAuthenticated;
  }
}
