
import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../shared/services/apiEndpoint';
import { Observable, Subject, Subscriber, of } from 'rxjs';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http$: HttpClient, private api: ApiEndpoint) {}

  private _user: User = null;

  public isAuthenticated() {
    return this._user !== null;
  }

  public get user() {
    return this._user;
  }

  public isAdmin() {
    return localStorage.getItem('authentication_test').includes('admin'); // <-- REMOVE THIS! this._user.role === 'ROLE_ADMIN';
  }

  login(username: string, password: string) {
    console.log(`Autenticando com:  btoa(${username}:${password})`);
    localStorage.setItem('authentication', btoa(`${username}:${password}`));
    localStorage.setItem('authentication_test', `${username}:${password}`);
    localStorage.setItem('isLoggedin', 'true');
    console.log(localStorage.getItem('authentication'));

    return this.http$.get<User>(ApiEndpoint.LOGIN)
    .pipe(
        tap((user: User) => {
          console.log(user);
          this._user = user;
        })
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
