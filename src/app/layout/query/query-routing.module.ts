import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueryIndexComponent } from './query-index/query-index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
  },
  {
    path: 'index',
    component: QueryIndexComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryRoutingModule { }
