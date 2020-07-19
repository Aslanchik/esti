import { Component } from '@angular/core';

import { RegisterUser } from '../../interfaces/register-user';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: RegisterUser = {
    govId: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
  };

  constructor(public registerSer: RegisterService) {}

  onSubmit({ value, valid }: { value: RegisterUser; valid: boolean }): void {
    if (valid) {
      this.registerSer.registerStaff(value);
    }
  }
}
