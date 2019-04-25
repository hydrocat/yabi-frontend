import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DirectoryService } from './directory.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { HateoasDirectory } from './directory.model';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  tap
} from 'rxjs/operators';
import { DirectoryFormNewComponent } from './directory-form-new/directory-form-new.component';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private directory$: DirectoryService,
    private _matDialog: MatDialog
  ) {}

  public dataSource: MatTableDataSource<HateoasDirectory>;
  public diplayedColumns = ['name', 'connectionString', 'username', 'password'];
  private _unsubscribe: Subject<void> = new Subject();
  public search = new FormControl('');

  ngOnInit() {
    this.directory$
      .index()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((p: HateoasDirectory[]) => {
        this.dataSource = new MatTableDataSource(p);
      });
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

  public onDirectoryNew() {
    const dialog = this._matDialog.open(DirectoryFormNewComponent, {
      minWidth: '60%',
      minHeight: '50%'
    });

    dialog.componentInstance.submission.subscribe(
      (directory: HateoasDirectory) => {
        this.dataSource = new MatTableDataSource([
          ...this.dataSource.data,
          directory
        ]);
        dialog.close();
      }
    );
  }

  public onDirectoryShow() {}

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
