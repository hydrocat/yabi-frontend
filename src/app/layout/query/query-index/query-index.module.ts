import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryService } from '../query.service';

import { QueryIndexComponent } from './query-index.component';
import { QueryShowComponent } from './query-show/query-show.component';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ QueryIndexComponent, QueryShowComponent ],
  exports: [
    QueryShowComponent,
    QueryIndexComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [ QueryService ],
  entryComponents: [ QueryShowComponent ]
})
export class QueryIndexModule { }
