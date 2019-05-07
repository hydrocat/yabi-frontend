import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryComponent } from './query.component';
import { QueryShowComponent } from './query-show/query-show.component';
import { QueryFormComponent } from './query-form/query-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [QueryComponent, QueryShowComponent, QueryFormComponent],
  imports: [CommonModule, SharedModule],
  entryComponents: [QueryShowComponent, QueryFormComponent]
})
export class QueryModule {}
