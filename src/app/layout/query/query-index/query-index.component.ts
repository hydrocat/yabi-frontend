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
import { Query, HateoasQuery } from '../query.model';
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

  public dataSource: MatTableDataSource<Query>;
  public diplayedColumns = ['name', 'description'];
  private _unsubscribe: Subject<void> = new Subject();
  public querySearch: FormControl;

  ngOnInit() {
    this.query
      .index()
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
    const dialog = this._matDialog.open(QueryShowComponent, {
      minWidth: '60%',
      minHeight: '50%',
      data: query
    });

    dialog.afterOpened().subscribe(() => {
      dialog.componentInstance.deleted.subscribe(() => {
        dialog.close();
        console.log(this.dataSource.data.filter( (e: Query) => e.id !== query.id));
        this.dataSource.data = this.dataSource.data.filter( (e: Query) => e.id !== query.id);
      });
    });
  }

  onQueryNew(): void {
    const dialog = this._matDialog.open(QueryFormComponent, {
      minWidth: '60%',
      minHeight: '50%'
    });

    dialog.afterOpened().subscribe(() => {
      console.log('opened');
      console.log(dialog.componentInstance.saved.observers);
      dialog.componentInstance.saved.subscribe((q: HateoasQuery) => {
        console.log('adding new entry!');
        console.log(q);
        console.log(q.toQuery());
        this.dataSource.data = this.dataSource.data.concat([q.toQuery()]);
        dialog.close();
      });
    });

    dialog.beforeClosed().subscribe(() => {
      console.log('removing subscription');
      dialog.componentInstance.saved.unsubscribe();
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
