import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule, ErrorHandler } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthInterceptor } from './authenticationInterceptor';
import { SnackBarErrorHandler } from './snackBarErrorHandler';
import { MatSnackBarModule } from '@angular/material';
import { ApiEndpoint } from './shared/services/apiEndpoint';
import { RouterModule } from '@angular/router';
// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        OverlayModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        SharedModule
    ],
    providers: [
        ApiEndpoint,
        SharedModule,
        AuthInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: AuthInterceptor,
            multi: true,
        },
        {
            provide: ErrorHandler,
            useClass: SnackBarErrorHandler,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
