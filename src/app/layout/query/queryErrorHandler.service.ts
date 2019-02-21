import { Injectable, ErrorHandler } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class QueryErrorHandler extends ErrorHandler {

    handleError(error: any) {
        console.log('PASSSEI');
        if ( error instanceof HttpErrorResponse ) {
            switch (error.status) {
                case 403:
                    console.error(new Error('Você não tem permissão para executar essa consulta'));
            }
        }
    }
}
