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
  // RETURN TOKEN TO WHOEVER ASKS
  getToken() {
    return this.token;
  }

  getLoginStatusListener() {
    return this.loginStatusListener.asObservable();
  }
  // RETURN THE STAFF THAT IS CURRENTLY LOGGED IN
  getCurrentlyLoggedIn() {
    return this.currentlyLoggedIn;
  }
  // VALIDATE IF LOGGED IN OR NOT
  getLoginStatus() {
    return this.isLoggedIn;
  }
  // IF USER HAS JWT AUTO LOG HIM IN
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

  // LOGOUT STAFF AND DELETE JWT
  logoutStaff() {
    this.token = null;
    this.isLoggedIn = false;
    this.loginStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  // SET TIMER FOR THE JWT - TAKES DURATION AND MAKES IT INTO MINUTES
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logoutStaff();
    }, duration * 1000);
  }

  // LOGIN STAFF USER TAKES FORM DATA
  loginStaff(value) {
    const user: LoginUser = value;

    this.http
      .post<{ token: string; expiresIn: number; fullName: string }>(
        this._loginUrl,
        user
      )
      .subscribe(
        (response) => {
          // ASSIGN CURRENTLY LOGGED IN FROM THE RESP OF SERVER
          this.currentlyLoggedIn = response.fullName;
          // SET TOKEN AS THE TOKEN FROM RESPONSE
          this.token = response.token;
          // IF TOKEN IS TRUTHY SET TIMER
          if (response.token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            // DECLARE THIS STAFF AS LOGGED IN
            this.isLoggedIn = true;
            this.loginStatusListener.next(true);
            // GET TIME
            const now = new Date();
            // DECLARE EXPIRATION TIME
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            // SAVE AUTH DATA IN LOCALSTORAGE
            this.saveAuthData(
              response.token,
              response.fullName,
              expirationDate
            );
            // NAVIGATE INTO THE APP AND WELCOME STAFF
            this.router.navigate(['/main']);
            this.swal.successToast(`Welcome, ${response.fullName}!`);
          }
        },
        // IF RESPONSE COMES AS ERROR DO A SWAL
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
  // GET AUTH DATA FROM LOCALSTORAGE
  private getAuthData() {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const expirationDate = localStorage.getItem('expiration');
    // IF ONE OF THEM DOESNT EXIST - STOP
    if (!token || !expirationDate || !name) return;
    // ELSE RETURN JWT
    return {
      token: token,
      name: name,
      expirationDate: new Date(expirationDate),
    };
  }
  // SAVE AUTH DATA INTO THE LOCALSTORAGE
  private saveAuthData(token: string, name: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }
  // CLEAR AUTH DATA UPON LOGOUT
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('expiration');
  }
}
