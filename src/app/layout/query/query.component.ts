import { Component, OnInit } from '@angular/core';
import { QueryService } from './query.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {
  constructor(private query: QueryService) { }

  ngOnInit() {
    console.log('Passei QueryComponent');
  }

}
