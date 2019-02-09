import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('adding authentication header');
    console.log(localStorage['authentication']);
    if ( localStorage['authentication'] === undefined) {
        this.router.navigate(['/login']);
    }

    if (req.url.indexOf('localhost:8080') > -1) {
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
