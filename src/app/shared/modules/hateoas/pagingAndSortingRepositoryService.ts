import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../services/apiEndpoint';
import { Entity } from './entity.model';
import { Repository, Acessor } from './repository.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  ) {
  }

  index(): Observable<E[]> {
    return this.http.get<R>(this.api).pipe(
      map((repo: R) => {
        return repo._embedded[this.acessor.acessorName].map((entity: E) => {
          return Object.assign( this.entityConstructor() , entity);
        });
      })
    );
  }
}

export function teste() {}
