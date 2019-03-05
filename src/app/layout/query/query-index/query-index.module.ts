import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryService } from '../query.service';

import { QueryIndexComponent } from './query-index.component';
import { QueryShowComponent } from './query-show/query-show.component';

import { SharedModule } from '../../../shared/shared.module';
import { QueryFormComponent } from './query-form/query-form.component';


@NgModule({
  declarations: [ QueryIndexComponent, QueryShowComponent, QueryFormComponent ],
  exports: [
    QueryShowComponent,
    QueryIndexComponent,
    QueryFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [ QueryService ],
  entryComponents: [ QueryShowComponent, QueryFormComponent]
})
export class QueryIndexModule { }
