import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivateChild {
    constructor(private router: Router) {}

    canActivateChild() {
        if (localStorage.getItem('isLoggedin') === 'true') {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
