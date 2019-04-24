import { Component, OnInit } from '@angular/core';
import { HateoasUser } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public users = [];

  constructor(private user$: UserService) { }

  ngOnInit() {
    this.user$.index().subscribe( (x: HateoasUser[]) => this.users = x.map( y => y.name ) );
  }

}
