import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService, User } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router, private login$: LoginService) {}

  ngOnInit() {}

  onLogin() {
    this.login$.login(this.username, this.password).subscribe(
      authenticated => {
        console.log(authenticated);
        if (authenticated) {
          this.router.navigate(['/dashboard']);
        }
      },
      error => {
        console.log(error);
        throw new Error('Authentication Unsuccessful');
      }
    );
  }
}
