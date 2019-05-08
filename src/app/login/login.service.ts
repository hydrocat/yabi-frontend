
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../shared/services/apiEndpoint';
import { Observable, Subject, Subscriber, of } from 'rxjs';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { tap } from 'rxjs/operators';
import { asTextData } from '@angular/core/src/view';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http$: HttpClient, private api: ApiEndpoint, private router: Router) {}

  private _user: User;

  isAuthenticated() {
    return this._user !== undefined && this._user !== null;
  }

  get user(): User {
    if (this._user !== undefined) {
      return this._user;
    } else {
      this.router.navigate(['/login']);
    }
    return this._user;
  }

  isAdmin() {
    if ( this.isAuthenticated() && this._user.role === 'ROLE_ADMIN') {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this._user = undefined;
    localStorage.removeItem('authentication');
    this.router.navigate(['/login']);
  }

  login(username: string, password: string) {
    localStorage.setItem('authentication', btoa(`${username}:${password}`));
    return this.http$.get<User>(ApiEndpoint.LOGIN)
    .pipe(
        tap( user => this._user = user )
    );
  }
}

export class User {
  constructor(
    public name: string,
    public role: 'ROLE_ADMIN' | 'ROLE_USER',
    public permission: string[]
  ) {}
}
