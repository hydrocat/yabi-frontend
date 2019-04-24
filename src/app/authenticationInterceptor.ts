import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiEndpoint } from './shared/services/apiEndpoint';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  jsessionid: string;

  constructor(
    private router: Router,
    private api: ApiEndpoint,
    private login$: LoginService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Skip if request does not go to api
    if (!req.url.startsWith(ApiEndpoint.BASE)) {
      return next.handle(req);
    }
    //                                                      REMOVE `TRUE` BEFORE PRODUCTION
    if (this.login$.isAuthenticated() || req.url === ApiEndpoint.LOGIN || true) {
      req = req.clone({
        setHeaders: {
          // Authorization: `Bearer ${localStorage.get('token')}`
          Authorization: `Basic ${localStorage['authentication']}`
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
    return next.handle(req);
  }
}
