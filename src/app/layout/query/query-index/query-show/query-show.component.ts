import { Component, OnInit, Input, Inject } from '@angular/core';
import { QueryService } from '../../query.service';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Query } from '../../query.model';

@Component({
  selector: 'app-query-show',
  templateUrl: './query-show.component.html',
  styleUrls: ['./query-show.component.scss']
})
export class QueryShowComponent implements OnInit {

  public data: any;
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: Array<string>;
  public queryRan = false;


  constructor(private query$: QueryService, @Inject(MAT_DIALOG_DATA) public query: Query) {
    this.data = query.description;
  }

  ngOnInit() {
    console.log(this.query);
  }

  runQuery() {
    this.query$.run(this.query)
      .subscribe( (data: Array<Array<any>>) => {
        console.log(data);
        this.displayedColumns = data.shift();
        this.dataSource = new MatTableDataSource(data);
        this.queryRan = true;
      });
  }

}
