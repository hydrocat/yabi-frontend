import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HateoasPermission } from './permission.model';
import { PermissionService } from './permission.service';
import { MatTableDataSource } from '@angular/material';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { takeUntil, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit, AfterViewInit {

  constructor(private ps: PermissionService) {}

  public dataSource: MatTableDataSource<HateoasPermission>;
  public diplayedColumns = ['nodePath', 'description'];
  private _unsubscribe: Subject<void> = new Subject();
  public search: FormControl;

  ngOnInit() {
    this.ps
      .index()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((p: HateoasPermission[]) => {
        this.dataSource = new MatTableDataSource(p);
      });
    this.search = new FormControl('');
  }

  ngAfterViewInit() {
    this.search.valueChanges
    .pipe(
      takeUntil(this._unsubscribe),
      debounceTime(300),
      distinctUntilChanged(),
      tap((text: string) => (this.dataSource.filter = text))
    )
    .subscribe();
  }

  public onPermissionNew() {
    console.log('Permission-create not implemented');
  }

  public onPermissionShow(p: HateoasPermission) {
    console.log('Show isn\'t implemented');
  }
}
