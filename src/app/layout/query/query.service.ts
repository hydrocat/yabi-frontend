import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, pluck, map, expand } from 'rxjs/operators';
import {
  Query,
  HateoasQuery,
  QueryRepository,
  QueryAcessor
} from './query.model';
import { of, Observable } from 'rxjs';
import { ApiEndpoint } from '../../shared/services/apiEndpoint';
import { PagingAndSortingRepositoryService } from '../../shared/modules/hateoas/pagingAndSortingRepositoryService';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private http$: HttpClient, private api: ApiEndpoint) {}
  private hateoasService = new HateoasQueryService(this.http$);

  public index(): Observable<Query[]> {
    return this.http$.get<Query[]>(ApiEndpoint.QUERIES);
  }

  public find(id: number): Observable<HateoasQuery> {
    return this.http$.get<HateoasQuery>(ApiEndpoint.FIND_QUERY(id)).pipe(
      map(q => Object.assign(new HateoasQuery(), q))
    );
  }

  public run(query: Query): Observable<any> {
    console.log('Running query: ', query);
    return this.http$.get(ApiEndpoint.RUNQUERY(query.id));
  }

  public create(query: Query): Observable<HateoasQuery> {
    console.log('Creating query: ', query);
    return this.http$
      .post<HateoasQuery>(ApiEndpoint.ADMIN_QUERIES, query)
      .pipe(map(q => Object.assign(new HateoasQuery(), q)));
  }

  public delete(query: Query | HateoasQuery) {
    let deleteUrl = '';
    if (query instanceof HateoasQuery) {
      deleteUrl = query.uri;
    } else {
      deleteUrl = ApiEndpoint.ADMIN_QUERIES.concat(`/${query.id}`);
    }
    return this.http$.delete(deleteUrl);
  }

  public patch(query: HateoasQuery): Observable<HateoasQuery> {
    return this.hateoasService.patch(query);
  }
}

class HateoasQueryService extends PagingAndSortingRepositoryService<
  HateoasQuery,
  QueryAcessor,
  QueryRepository
> {
  constructor(private http$: HttpClient) {
    super(
      () => new HateoasQuery(),
      new QueryAcessor(),
      http$,
      ApiEndpoint.ADMIN_QUERIES
    );
  }
}
