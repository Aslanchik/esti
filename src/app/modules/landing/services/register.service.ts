import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterUser } from '../interfaces/register-user';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/utils/toast.service';
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private _registerUrl: string = 'http://localhost:3000/api/register';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService
  ) {}

  registerStaff(value) {
    const user: RegisterUser = value;
    this.http.post(this._registerUrl, user).subscribe((response) => {
      this.router.navigate(['/main']);
      this.toast.successToast(
        `New Staff Successfully Registered, Welcome ${user.fname} ${user.lname}!`
      );
    });
  }
}
