import { Component, OnInit } from '@angular/core';
import { QueryService } from './query.service';
import { MatDialog } from '@angular/material';
import { QueryFormComponent } from './query-index/query-form/query-form.component';
import { Query } from './query.model';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent {
  constructor() { }
}
