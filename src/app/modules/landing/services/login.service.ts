import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../interfaces/login-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _loginUrl: string = 'http://localhost:3000/login';

  private token: string;
  private loginStatusListener = new Subject<boolean>();
  private isLoggedIn = false;
  private currentlyLoggedIn = '';

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getLoginStatusListener() {
    return this.loginStatusListener.asObservable();
  }

  getCurrentlyLoggedIn() {
    return this.currentlyLoggedIn;
  }

  getLoginStatus() {
    return this.isLoggedIn;
  }

  autoLoginUser() {
    const loginInfo = this.getLoginData();
  }

  logoutStaff() {
    this.token = null;
    this.isLoggedIn = false;
    this.loginStatusListener.next(false);
    this.clearLoginData();
    this.router.navigate(['/']);
  }

  loginStaff(value) {
    const user: LoginUser = value;
    this.http
      .post<{ token: string; fullName: string }>(this._loginUrl, user)
      .subscribe((response) => {
        this.currentlyLoggedIn = response.fullName;
        const token = response.token;
        this.token = token;
        if (token) {
          this.isLoggedIn = true;
          this.loginStatusListener.next(true);
          this.saveLoginData(token);
          this.router.navigate(['/main']);
        }
      });
    return;
  }
  private getLoginData() {
    const token = localStorage.getItem('token');
    if (!token) return;
    return {
      token: token,
    };
  }
  private saveLoginData(token: string) {
    localStorage.setItem('token', token);
  }

  private clearLoginData() {
    localStorage.removeItem('token');
  }
}
