import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  tap
} from 'rxjs/operators';
import { SharedModule as Global } from '../../shared/shared.module';
import { LoginService } from '../../login/login.service';
import { HateoasUser } from './user.model';
import { UserService } from './user.service';
import { UserShowComponent } from './user-show/user-show.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private directory$: UserService,
    private _matDialog: MatDialog,
    public login$: LoginService
  ) {}

  public dataSource: MatTableDataSource<HateoasUser>;
  public diplayedColumns = ['name', 'role'];
  private _unsubscribe: Subject<void> = new Subject();
  public search: FormControl;

  ngOnInit() {
    this.directory$
      .index()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((p: HateoasUser[]) => {
        this.dataSource = new MatTableDataSource(p);
      });

    this.search = new FormControl('');
  }

  ngAfterViewInit() {
    this.search.valueChanges
      .pipe(
        takeUntil(this._unsubscribe),
        debounceTime(Global.debounceTime),
        distinctUntilChanged(),
        tap((text: string) => (this.dataSource.filter = text))
      )
      .subscribe();
  }

  onUserShow(user: HateoasUser) {
    this._matDialog.open(UserShowComponent,
      {
        minWidth: '60%',
        minHeight: '50%',
        data: user
      });
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
