import { Injectable, ErrorHandler, NgZone, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginService } from './login/login.service';

@Injectable({
    providedIn: 'root'
})
export class SnackBarErrorHandler implements ErrorHandler {
    constructor(
                private zone: NgZone,
                private bar: MatSnackBar,
                private injector: Injector,
                private login$: LoginService
                ) {}

    handleError(error: any) {
        console.error(error);

        this.zone.run(() => {
                this.bar.open(error.message, '', {duration: 1500});
        });

        if ( error instanceof HttpErrorResponse ) {
            this.httpError(error);
        }
    }

    httpError(error: HttpErrorResponse) {
        console.log('Erro HTTP');
        if ( error.status === 401) { // 400, unAuthorized
            this.login$.logout();
            this.zone.run(() => {
                    this.injector.get(Router).navigate(['/login']);
            });
        }
    }
}
