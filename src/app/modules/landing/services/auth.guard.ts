import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private loginSer: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // AUTHENTICATE A USER BEFORE HE GOES SOMEWHERE
    const isLoggedIn = this.loginSer.getLoginStatus();
    // IF NOT LOGGED IN SEND TO LOGIN PAGE
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
    }
    return isLoggedIn;
  }
}
