import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QueryRoutingModule } from './query-routing.module';
import { QueryComponent } from './query.component';
import { QueryService } from './query.service';
import { QueryIndexModule } from './query-index/query-index.module';

@NgModule({
  imports: [CommonModule, QueryRoutingModule, QueryIndexModule],
  exports: [],
  declarations: [QueryComponent],
  providers: [QueryService]
})
export class QueryModule {}
