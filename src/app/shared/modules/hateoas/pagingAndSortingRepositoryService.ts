import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../services/apiEndpoint';
import { Entity } from './entity.model';
import { Repository, Acessor } from './repository.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedModule } from '../../shared.module';

export class PagingAndSortingRepositoryService<
  E extends Entity,
  A extends Acessor,
  R extends Repository<A>
> {
  constructor(
    private entityConstructor: () => E,
    private acessor: A,
    private http: HttpClient,
    private api: string
  ) {}

  index(): Observable<E[]> {
    return this.http.get<R>(this.api).pipe(
      map((repo: R) => {
        return repo._embedded[this.acessor.acessorName].map((entity: E) => {
          return Object.assign(this.entityConstructor(), entity);
        });
      })
    );
  }

  create(entity: any): Observable<E> {
    return this.http.post<E>(this.api, entity).pipe(
      map((responseEntity: E) => {
        return Object.assign(this.entityConstructor(), responseEntity);
      })
    );
  }

  delete(entity: E): Observable<Object> {
    return this.http.delete(entity.uri);
  }

  patch(entity: E): Observable<E> {
    return this.http
      .patch<E>(entity.uri, entity)
      .pipe(map((responseEntity: E) => Object.assign(this.entityConstructor(), responseEntity)));
  }
}
