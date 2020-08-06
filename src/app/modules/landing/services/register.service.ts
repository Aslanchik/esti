import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RegisterUser } from '../interfaces/register-user';
import { LoginService } from './login.service';
import { LoginUser } from '../interfaces/login-user';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private _registerUrl: string = 'http://localhost:5000/api/register';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  mapToLogin(govId, password) {
    return {
      govId: govId,
      password: password,
    };
  }

  idEmailError: Subject<string> = new Subject<string>();

  registerStaff(value) {
    const user: RegisterUser = value;
    const loginUser: LoginUser = this.mapToLogin(user.govId, user.password);
    this.http.post(this._registerUrl, user).subscribe(
      (response) => {
        this.loginService.loginStaff(loginUser);
      },
      ({ error }) => {
        if (error === 'id') {
          Swal.fire({
            icon: 'error',
            title: 'Registration Error',
            text: 'ID is already registered.',
            confirmButtonText: 'Try Again',
          });
        } else if (error === 'email') {
          Swal.fire({
            icon: 'error',
            title: 'Registration Error',
            text: 'Email is already registered.',
            confirmButtonText: 'Try Again',
          });
        }
        this.idEmailError.next(error);
      }
    );
  }
}
