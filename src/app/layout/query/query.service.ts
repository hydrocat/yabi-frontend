import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, pluck, map, expand } from 'rxjs/operators';
import { Query, HateoasQuery, QueryRepository } from './query.model';
import { of, Observable } from 'rxjs';
import { ApiEndpoint } from '../../shared/services/apiEndpoint';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private http: HttpClient, private api: ApiEndpoint) {}

  public index(): Observable<Query[]> {
    return this.http.get<Query[]>(this.api.QUERIES);
  }

  public run(query: Query): Observable<any> {
    console.log('Running query: ', query);
    return this.http.get(this.api.RUNQUERY(query.id));
  }

  public create(query: Query): Observable<HateoasQuery> {
    console.log('Creating query: ', query);
    return this.http
      .post<HateoasQuery>(this.api.ADMIN_QUERIES, query)
      .pipe(map(q => Object.assign(new HateoasQuery(), q)));
  }

  public delete(query: Query | HateoasQuery) {
    let deleteUrl = '';
    if (query instanceof HateoasQuery) {
      deleteUrl = query.uri;
    } else {
      deleteUrl = this.api.ADMIN_QUERIES.concat(`/${query.id}`);
    }
    return this.http.delete(deleteUrl);
  }

  public patch(query: Query | HateoasQuery) { }
}

// src/app/app.module.ts                       |  8 +--
// .../query-index/query-index.component.html  |  8 +--
// .../query-index/query-index.component.scss  |  5 ++
// .../query-index/query-index.component.ts    |  8 +++
// .../query/query-index/query-index.module.ts | 10 ++--
// .../query-show/query-show.component.html    | 11 ++--
// .../query-show/query-show.component.ts      | 49 ++++++++++-------
// src/app/layout/query/query.model.ts         | 19 +++++--
// src/app/layout/query/query.service.ts       |  8 ++-
