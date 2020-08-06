import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterUser } from '../interfaces/register-user';
import { LoginService } from './login.service';
import { LoginUser } from '../interfaces/login-user';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private _registerUrl: string = 'staff/register';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  mapToLogin(govId, password) {
    return {
      govId: govId,
      password: password,
    };
  }

  registerStaff(value) {
    const user: RegisterUser = value;
    const loginUser: LoginUser = this.mapToLogin(user.govId, user.password);
    this.http.post(this._registerUrl, user).subscribe((response) => {
      this.loginService.loginStaff(loginUser);
    });
  }
}
