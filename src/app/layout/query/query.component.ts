import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { QueryService } from './query.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { QueryFormComponent } from './query-form/query-form.component';
import { Query, HateoasQuery } from './query.model';
import { LoginService } from '../../login/login.service';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import {
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  tap
} from 'rxjs/operators';
import { QueryShowComponent } from './query-show/query-show.component';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private query: QueryService,
    private _matDialog: MatDialog,
    public login$: LoginService,
    private query$: QueryService
  ) {}

  public dataSource: MatTableDataSource<Query>;
  public diplayedColumns = ['name', 'description', 'actions'];
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
        debounceTime(SharedModule.debounceTime),
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
  }

  onQueryNew(): void {
    const dialog = this._matDialog.open(QueryFormComponent, {
      minWidth: '60%',
      minHeight: '50%'
    });

    dialog.afterOpened().subscribe(() => {
      dialog.componentInstance.saved.subscribe((q: HateoasQuery) => {
        this.dataSource.data = this.dataSource.data.concat([q.toQuery()]);
        this.dataSource._updateChangeSubscription();
        dialog.close();
      });
    });

    dialog.beforeClosed().subscribe(() => {
      dialog.componentInstance.saved.unsubscribe();
    });
  }

  onQueryEdit(query: Query) {
    const dialog = this._matDialog.open(QueryFormComponent, {
      minWidth: '60%',
      minHeight: '50%',
      data: query
    });

    dialog.afterOpened().subscribe(() => {
      dialog.componentInstance.saved.subscribe((updatedQuery: HateoasQuery) => {
        this.dataSource.data = this.dataSource.data
          .filter(q => q.id !== updatedQuery.id)
          .concat(updatedQuery.toQuery());
          this.dataSource._updateChangeSubscription();
          dialog.close();
      });
    });

    dialog.beforeClosed().subscribe( () => {
      dialog.componentInstance.saved.unsubscribe();
    });
  }

  onQueryDelete(query: Query) {
    this.query$
      .delete(query)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(
          (q: Query) => q.id !== query.id
        );
        this.dataSource._updateChangeSubscription();
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
