import { Component, OnInit, Input, Inject, OnDestroy, EventEmitter, Output } from '@angular/core';
import { QueryService } from '../query.service';
import {
  MAT_DIALOG_DATA,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { Query, HateoasQuery } from '../query.model';
import { DataSource } from '@angular/cdk/table';
import { Subscription, Subject } from 'rxjs';
import { QueryFormComponent } from '../query-form/query-form.component';
import { tap, takeUntil } from 'rxjs/operators';
import { LoginService } from '../../../login/login.service';

@Component({
  selector: 'app-query-show',
  templateUrl: './query-show.component.html',
  styleUrls: ['./query-show.component.scss']
})
export class QueryShowComponent implements OnInit, OnDestroy {
  @Output() public deleted: EventEmitter<Query>;
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: Array<string>;
  public queryRan = false;

  private _unsubscribe = new Subject();

  constructor(
    public login$: LoginService,
    private query$: QueryService,
    @Inject(MAT_DIALOG_DATA) public query: Query,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.deleted  = new EventEmitter<null>();
   }
  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  runQuery(): Subscription {
    return this.query$.run(this.query).subscribe((data: Array<Array<any>>) => {
      this.displayedColumns = data.shift();
      this.dataSource = new MatTableDataSource(data);
      this.queryRan = true;
    });
  }

  onQueryEdit() {
    this._matDialog.open(QueryFormComponent, {
      minWidth: '60%',
      minHeight: '50%',
      data: this.query
    });
  }

  onQueryDelete() {
    this.query$.delete(this.query).pipe(takeUntil(this._unsubscribe)).subscribe(
      () => this.deleted.emit(this.query)
    );
  }

  download(): void {
    if ( !this.queryRan ) {
      this.runQuery();
    }
    const str = [this.displayedColumns, ...this.dataSource.data]
      .map((line: Array<string>) => {
        return line.map((value: string) => '\'' + value + '\'').join(',');
      })
      .join('\n');

    const data = new Blob([str]);
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = this.query.name.split(' ').join('_') + '.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
