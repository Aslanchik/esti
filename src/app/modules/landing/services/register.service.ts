import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUser } from '../interfaces/register-user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private _registerUrl: string = 'http://localhost:3000/api/register';

  message: {};

  constructor(private http: HttpClient, private router: Router) {}

  registerStaff(value) {
    const user: RegisterUser = value;
    this.http.post(this._registerUrl, user).subscribe((response) => {
      this.message = response;
      this.router.navigate(['/main']);
    });
  }
}
