import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../shared/services/apiEndpoint';
import { Observable } from 'rxjs';
import { HateoasUser, UserRepository, UserAcessor } from './user.model';
import { map } from 'rxjs/operators';
import { PagingAndSortingRepositoryService } from '../../shared/modules/hateoas/pagingAndSortingRepositoryService';

@Injectable({ providedIn: 'root' })
export class UserService extends PagingAndSortingRepositoryService<
  HateoasUser,
  UserAcessor,
  UserRepository
> {
  constructor(private http$: HttpClient) {
    super(() => new HateoasUser(), new UserAcessor(), http$, ApiEndpoint.USERS);
  }
}
