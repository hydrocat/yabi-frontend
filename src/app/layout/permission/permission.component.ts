import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HateoasPermission, Permission } from './permission.model';
import { PermissionService } from './permission.service';
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
import { PermissionFormNewComponent } from './permission-form-new/permission-form-new.component';
import { PermissionFormEditComponent } from './permission-form-edit/permission-form-edit.component';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private ps: PermissionService,
    private _matDialog: MatDialog,
    public login$: LoginService
  ) {}

  public dataSource: MatTableDataSource<HateoasPermission>;
  public diplayedColumns = ['nodePath', 'description'];
  private _unsubscribe: Subject<void> = new Subject();
  public search: FormControl;

  ngOnInit() {
    if (this.login$.isAdmin()) {
      this.diplayedColumns.push('addChild');
      this.ps
        .index()
        .pipe(takeUntil(this._unsubscribe))
        .subscribe((p: HateoasPermission[]) => {
          this.dataSource = new MatTableDataSource(p);
        });
    } else {
      // User has role `USER`
      this.ps
        .userIndex()
        .pipe(takeUntil(this._unsubscribe))
        .subscribe((p: Permission[]) => {

          this.dataSource = new MatTableDataSource(p.map(x => x.toHateoas()));
        });
    }

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

  public onPermissionNew(parent: HateoasPermission) {
    const dialog = this._matDialog.open(PermissionFormNewComponent, {
      minWidth: '60%',
      minHeight: '50%',
      data: parent
    });

    dialog.componentInstance.submition.subscribe((p: HateoasPermission) => {
      this.dataSource = new MatTableDataSource([...this.dataSource.data, p]);
      dialog.close();
    });
  }

  public onPermissionEdit(permission: HateoasPermission) {
    this._matDialog.open(PermissionFormEditComponent, {
      minWidth: '60%',
      minHeight: '50%',
      data: permission
    });
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
