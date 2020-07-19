import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../interfaces/login-user';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/utils/swal.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _loginUrl: string = 'http://localhost:3000/api/login';

  private token: string;
  private loginStatusListener = new Subject<boolean>();
  private isLoggedIn = false;
  private currentlyLoggedIn = '';
  private tokenTimer: NodeJS.Timer;

  constructor(
    private http: HttpClient,
    private router: Router,
    private swal: SwalService
  ) {}

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

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) return;
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.currentlyLoggedIn = authInfo.name;
      this.isLoggedIn = true;
      this.setAuthTimer(expiresIn / 1000);
      this.loginStatusListener.next(true);
    }
  }

  logoutStaff() {
    this.token = null;
    this.isLoggedIn = false;
    this.loginStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer:' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logoutStaff();
    }, duration * 1000);
  }

  loginStaff(value) {
    const user: LoginUser = value;

    this.http
      .post<{ token: string; expiresIn: number; fullName: string }>(
        this._loginUrl,
        user
      )
      .subscribe(
        (response) => {
          this.currentlyLoggedIn = response.fullName;
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isLoggedIn = true;
            this.loginStatusListener.next(true);

            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );

            this.saveAuthData(token, response.fullName, expirationDate);

            this.router.navigate(['/main']);
            this.swal.successToast(`Welcome, ${response.fullName}!`);
          }
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Sign In was Unsuccessfull!',
            text: 'ID or Password were incorrect.',
            confirmButtonText: 'Try Again',
          });
        }
      );
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate || !name) return;
    return {
      token: token,
      name: name,
      expirationDate: new Date(expirationDate),
    };
  }

  private saveAuthData(token: string, name: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('expiration');
  }
}
