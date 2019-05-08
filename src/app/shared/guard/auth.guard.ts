import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
    constructor(private router: Router, private login$: LoginService) {}

    canActivateChild() {
        if (this.login$.isAuthenticated() ) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
