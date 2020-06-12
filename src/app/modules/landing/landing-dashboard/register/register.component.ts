import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../../../../interfaces/register-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: RegisterUser = {
    id: '',
    email: '',
    fname: '',
    lname: '',
    password: '',
  };

  constructor() {}

  ngOnInit(): void {}
  onSubmit({ value, valid }: { value: RegisterUser; valid: boolean }): void {
    console.log(value, valid);
  }
}
