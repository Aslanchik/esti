import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../interfaces/login-user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _loginUrl: string = 'http://localhost:3000/login';

  private token: string;
  private loginStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }
  getLoginStatusListener() {
    return this.loginStatusListener.asObservable();
  }
  loginStaff(value) {
    const user: LoginUser = value;
    this.http
      .post<{ token: string }>(this._loginUrl, user)
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        this.loginStatusListener.next(true);
      });
    return;
  }
}
