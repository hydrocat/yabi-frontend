import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;

    constructor(private router: Router, private http: HttpClient) {}

    ngOnInit() { }

    onLogin() {
        console.log(`Autenticado com:  btoa(${this.username}:${this.password})`);
        localStorage.setItem('authentication', btoa(`${this.username}:${this.password}`));
        localStorage.setItem('authentication_test', `${this.username}:${this.password}`);
        localStorage.setItem('isLoggedin', 'true');
        console.log(localStorage.getItem('authentication'));
        this.router.navigate(['/dashboard']);
    }
}
