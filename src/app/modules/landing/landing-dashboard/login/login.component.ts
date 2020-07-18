import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../../interfaces/login-user';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: LoginUser = {
    govId: '',
    password: '',
  };
  private loginListenerSubs: Subscription;

  isLoggedIn = false;

  constructor(public loginSer: LoginService, private router: Router) {}

  ngOnInit(): void {}

  checkLogIn() {
    this.loginListenerSubs = this.loginSer
      .getLoginStatusListener()
      .subscribe((isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  onSubmit({ value, valid }: { value: LoginUser; valid: boolean }): void {
    if (valid) {
      this.loginSer.loginStaff(value);
      this.checkLogIn();
    }
    this.user = { govId: '', password: '' };
  }
}
