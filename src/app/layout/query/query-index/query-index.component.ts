import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { QueryService } from '../query.service';
import { Subject } from 'rxjs';
import {
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  tap
} from 'rxjs/operators';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Query } from '../query.model';
import { QueryShowComponent } from './query-show/query-show.component';
import { QueryFormComponent } from './query-form/query-form.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-query-index',
  templateUrl: './query-index.component.html',
  styleUrls: ['./query-index.component.scss']
})
export class QueryIndexComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private query: QueryService, private _matDialog: MatDialog) {}

  public dataSource: MatTableDataSource<any>;
  public diplayedColumns = ['name', 'description'];
  private _unsubscribe: Subject<void> = new Subject();
  public queries: Query[];
  public querySearch: FormControl;

  ngOnInit() {
    this.query
      .getQueries()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((data: Query[]) => {
        this.dataSource = new MatTableDataSource(data);
      });

    this.querySearch = new FormControl('');
  }

  ngAfterViewInit() {
    this.querySearch.valueChanges
      .pipe(
        takeUntil(this._unsubscribe),
        debounceTime(300),
        distinctUntilChanged(),
        tap((text: string) => (this.dataSource.filter = text))
      )
      .subscribe();
  }

  onQueryShow(query: Query): void {
    this._matDialog.open(QueryShowComponent, {
      minWidth: '60%',
      minHeight: '50%',
      data: query
    });
  }

  onQueryNew(): void {
    this._matDialog.open(QueryFormComponent, {
      minWidth: '60%',
      minHeight: '50%'
    });
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  // public queries$: Observable<any[]>;

  // ngOnInit() {
  //   this.queries$ = this.query.getQueries();
  // }
}
