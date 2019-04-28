import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { HateoasUser } from '../user.model';
import { HateoasPermission } from '../../permission/permission.model';
import { Subject } from 'rxjs';
import { UserService } from '../user.service';
import { PermissionService } from '../../permission/permission.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss']
})
export class UserShowComponent implements OnInit, OnDestroy {
  public userPermissions: HateoasPermission[];
  public allPermissions: HateoasPermission[];
  public dataSource: MatTableDataSource<HateoasPermission>;
  public diplayedColumns = ['nodePath', 'action'];
  private _unsubscribe: Subject<void> = new Subject();

  public permissionFormControl = new FormControl();
  public selectedPermission: HateoasPermission;

  constructor(
    public user$: UserService,
    public permission$: PermissionService,
    @Inject(MAT_DIALOG_DATA) public user: HateoasUser
  ) {}

  ngOnInit() {
    this.user$
      .permissions(this.user.id)
      .subscribe((permissions: HateoasPermission[]) => {
        this.userPermissions = permissions;
        this.dataSource = new MatTableDataSource(this.userPermissions);
      });

    this.permission$.index().subscribe((permisssions: HateoasPermission[]) => {
      this.allPermissions = permisssions;
    });

    this.permissionFormControl.valueChanges.subscribe(p => {
      this.selectedPermission = p;
    });
  }

  onUnassignPermission(permission: HateoasPermission) {
    this.user$.unAssignPermission(this.user.id, permission).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter( p => p.uri !== permission.uri );
        this.dataSource._updateChangeSubscription();
      }
    );
    console.log('DeLeTeD tHiS pErMiSsIoN');
  }

  onAssignPermission() {
    if (this.selectedPermission) {
      this.user$
        .assignPermission(this.user.id, this.selectedPermission)
        .subscribe(() => {
          this.dataSource.data.push(this.selectedPermission);
          this.dataSource._updateChangeSubscription();
        });
    }
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
