import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../shared/services/apiEndpoint';
import { Permission, PermissionRepository } from './permission.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private http$: HttpClient, private api: ApiEndpoint) {}

  index(): Observable<Permission[]> {
    return this.http$.get<PermissionRepository>(this.api.PERMISSIONS).pipe(
      map(
        (pr: PermissionRepository): Permission[] => {
          return pr._embedded.permissionTrees.map(p => {
            return Object.assign(new Permission(), p);
          });
        }
      )
    );
  }
}
