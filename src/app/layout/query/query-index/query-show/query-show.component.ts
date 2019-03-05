import { Component, OnInit, Input, Inject } from '@angular/core';
import { QueryService } from '../../query.service';
import {
  MAT_DIALOG_DATA,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { Query } from '../../query.model';
import { DataSource } from '@angular/cdk/table';
import { Subscription } from 'rxjs';
import { QueryFormComponent } from '../query-form/query-form.component';

@Component({
  selector: 'app-query-show',
  templateUrl: './query-show.component.html',
  styleUrls: ['./query-show.component.scss']
})
export class QueryShowComponent implements OnInit {
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: Array<string>;
  public queryRan = false;

  constructor(
    private query$: QueryService,
    @Inject(MAT_DIALOG_DATA) public query: Query,
    private _matDialog: MatDialog
  ) {}

  ngOnInit() {}

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

  download(): void {
    console.log('start download:');
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
