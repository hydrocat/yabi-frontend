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
import { DirectoryFormEditComponent } from './directory-form-edit/directory-form-edit.component';

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
  public diplayedColumns = ['name', 'connectionString', 'username', 'password', 'actions'];
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
        this.dataSource.data.push(directory);
        this.dataSource._updateChangeSubscription();
        dialog.close();
      }
    );
  }

  onDirectoryDelete(directory: HateoasDirectory) {
    this.directory$.delete(directory).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter( d => d.uri !== directory.uri);
      this.dataSource._updateChangeSubscription();
    });
  }

  public onDirectoryShow(directory: HateoasDirectory) {
    const dialog = this._matDialog.open(DirectoryFormEditComponent, {
      minWidth: '60%',
      minHeight: '50%',
      data: directory
    });

    dialog.componentInstance.submission.subscribe(
      (d: HateoasDirectory) => {
        this.dataSource.data = this.dataSource.data.filter( x => x.uri !== d.uri).concat([d]);
        this.dataSource._updateChangeSubscription();
        dialog.close();
      }
    );
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
