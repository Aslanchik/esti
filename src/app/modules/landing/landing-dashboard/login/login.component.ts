import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginUser } from '../../../../interfaces/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: LoginUser = {
    id: '123456789',
    password: '123456789',
  };
  constructor() {}

  ngOnInit(): void {}
  onSubmit({ value, valid }: { value: LoginUser; valid: boolean }): void {
    console.log(value, valid);
  }
}
