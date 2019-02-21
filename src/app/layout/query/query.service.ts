import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, pluck, map, expand } from 'rxjs/operators';
import { Query } from './query.model';
import { of, Observable } from 'rxjs';
import { ApiEndpoint } from '../../shared/services/apiEndpoint';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient, private api: ApiEndpoint) { }
  public queries: any[] = [];

  public getQueries (): Observable<Query[]> {
    return this.http.get<Query[]>(this.api.QUERIES).pipe( tap(console.log) );
  }

  public run(query: Query): Observable<any> {
    console.log(query);
    return this.http.get(this.api.RUNQUERY(9));
  }

}
