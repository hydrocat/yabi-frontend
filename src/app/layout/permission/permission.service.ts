import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../shared/services/apiEndpoint';
import {
  HateoasPermission,
  PermissionRepository,
  Permission,
  PermissionAcessor
} from './permission.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagingAndSortingRepositoryService } from '../../shared/modules/hateoas/pagingAndSortingRepositoryService';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends PagingAndSortingRepositoryService<
  HateoasPermission,
  PermissionAcessor,
  PermissionRepository
> {

  constructor(private http$: HttpClient) {
    super(() => new HateoasPermission(), new PermissionAcessor(), http$, ApiEndpoint.ADMIN_PERMISSIONS);
  }

  userIndex(): Observable<Permission[]> {
    return this.http$.get<Permission[]>(ApiEndpoint.PERMISSIONS).pipe(
      map(pr => {
        return pr.map(p => {
          return Object.assign(new Permission(), p);
        });
      })
    );
  }

  create(permission: Permission): Observable<HateoasPermission> {
    return this.http$.post<HateoasPermission>(
      ApiEndpoint.ADMIN_PERMISSIONS,
      permission
    );
  }
}
