import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, pluck, map, expand } from 'rxjs/operators';
import { Query } from './query.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }
  private apiAddress = 'http://localhost:8080/';
  private queryUrl = this.apiAddress + 'sqlQueries';
  private runQueryUrl = this.apiAddress + 'runQuery';
  public queries: any[] = [];

  public runQuery;

  public getQueries (): any {
    const query = this.http.get(this.queryUrl)
    .pipe(
      tap(console.log),
      pluck('_embedded', 'sqlQueries')
      );

    return query.pipe(
      map( (x: Array<any>) => x.map( q => new Query(q)))
    );
  }

  public run(query: Query): Observable<any> {
    const url = this.runQueryUrl + '/' + query.id;
    return this.http.get(url);
  }

}
