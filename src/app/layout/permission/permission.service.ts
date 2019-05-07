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
import { CachedPagingAndSortingRepositoryService } from '../../shared/modules/hateoas/cachedPagingAndSortingRepositoryService';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends CachedPagingAndSortingRepositoryService<
  HateoasPermission,
  PermissionAcessor,
  PermissionRepository
> {
  constructor(private http$: HttpClient) {
    super(
      () => new HateoasPermission(),
      new PermissionAcessor(),
      http$,
      ApiEndpoint.ADMIN_PERMISSIONS
    );
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


  /**
   * The DELETE method for Permission is a special api call that cascades all
   * child permissions.
   *
   * The return value is an array of all deleted permissions
   */
  delete(permission: HateoasPermission): Observable<number[]> {
    return this.http$
      .delete(`${ApiEndpoint.DELETE_PERMISSION}/${permission.id}`)
      .pipe(
        map((response: Object) => {
          return response as number[];
        })
      );
  }
}
