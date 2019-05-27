import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../shared/services/apiEndpoint';
import { Observable } from 'rxjs';
import { HateoasUser, UserRepository, UserAccessor } from './user.model';
import { map } from 'rxjs/operators';
import { PagingAndSortingRepositoryService } from '../../shared/modules/hateoas/pagingAndSortingRepositoryService';
import {
  HateoasPermission,
  PermissionRepository
} from '../permission/permission.model';

@Injectable({ providedIn: 'root' })
export class UserService extends PagingAndSortingRepositoryService<
  HateoasUser,
  UserAccessor,
  UserRepository
> {
  constructor(private http$: HttpClient) {
    super(() => new HateoasUser(), new UserAccessor(), http$, ApiEndpoint.USERS);
  }

  permissions(userId: number): Observable<HateoasPermission[]> {
    return this.http$
      .get<PermissionRepository>(ApiEndpoint.USER_PERMISSIONS(userId))
      .pipe(
        map((repo: PermissionRepository) => {
          return repo._embedded.permissionTrees.map(
            (entity: HateoasPermission) => {
              return Object.assign(new HateoasPermission(), entity);
            }
          );
        })
      );
  }

  assignPermission(userId: number, permission: HateoasPermission) {
    return this.http$.post(ApiEndpoint.USER_PERMISSIONS(userId), `${permission.uri}\n`, {
      headers: { 'Content-Type': 'text/uri-list' }
    });
  }

  unAssignPermission(userId: number, permisison: HateoasPermission) {
    return this.http$.delete(ApiEndpoint.USER_PERMISSION(userId, permisison.id));
  }
}
