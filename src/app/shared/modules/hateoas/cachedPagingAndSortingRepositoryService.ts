import { PagingAndSortingRepository } from './pagingAndSortingRepository.model';
import { Entity } from './entity.model';
import { Acessor, Repository } from './repository.model';
import { PagingAndSortingRepositoryService } from './pagingAndSortingRepositoryService';
import { SharedModule } from '../../shared.module';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export class CachedPagingAndSortingRepositoryService<
  E extends Entity,
  A extends Acessor,
  R extends Repository<A>
> extends PagingAndSortingRepositoryService<E, A, R> {
  private localValues: E[];
  private lastRequestTime: Date;
  private refreshTime = SharedModule.serviceCacheExpirationTime;
  index(): Observable<E[]> {
    const currentTime = new Date();
    // Request API if:
    // 1. Elapsed time between last request and now is greater than refreshTime
    // 2. Didn't consult API yet (lastRequestTime not instance of Date)
    const requestApi =
      !(this.lastRequestTime instanceof Date) ||
      this.localValues === undefined ||
      currentTime.getTime() - this.lastRequestTime.getTime() > this.refreshTime
        ? true
        : false;

    this.lastRequestTime = currentTime;

    if (requestApi) {
      return super.index().pipe(
        tap(response => {
          this.localValues = response;
        })
      );
    } else {
      return of(this.localValues);
    }
  }
}
