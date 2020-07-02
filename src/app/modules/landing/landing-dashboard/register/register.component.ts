import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../../interfaces/register-user';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: RegisterUser = {
    govId: '',
    fname: '',
    lname: '',
    email: '',
    password: '',
  };

  constructor(public registerSer: RegisterService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit({ value, valid }: { value: RegisterUser; valid: boolean }): void {
    this.registerSer.registerStaff(value);
    this.router.navigate(['/login']);
  }
}
