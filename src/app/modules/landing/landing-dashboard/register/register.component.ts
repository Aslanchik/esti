import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../../interfaces/register-user';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: RegisterUser;

  constructor(public registerSer: RegisterService) {}

  ngOnInit(): void {}

  onSubmit({ value, valid }: { value: RegisterUser; valid: boolean }): void {
    this.registerSer.registerStaff(value);
  }
}
