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

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  jsessionid: string;

  constructor(private router: Router, private api: ApiEndpoint) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Skip if request does not go to api
    if (!req.url.includes(this.api.BASE)) {
      return next.handle(req);
    }

    if (localStorage['authentication'] === undefined) {
      this.router.navigate(['/login']);
      throw new Error('Unauthorized');
    } else {
      req = req.clone({
        setHeaders: {
          // Authorization: `Bearer ${localStorage.get('token')}`
          Authorization: `Basic ${localStorage['authentication']}`
        }
      });
    }
    return next.handle(req);
  }
}
