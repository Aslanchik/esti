import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private loginSer: LoginService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // ADD TOKEN TO ALL REQUESTS TO SERVER
    const token = this.loginSer.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(authRequest);
  }
}
