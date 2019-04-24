import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DirectoryRepository,
  HateoasDirectory,
  DirectoryAcessor
} from './directory.model';
import { ApiEndpoint } from '../../shared/services/apiEndpoint';
import { map } from 'rxjs/operators';
import { PagingAndSortingRepositoryService } from '../../shared/modules/hateoas/pagingAndSortingRepositoryService';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService extends PagingAndSortingRepositoryService<
  HateoasDirectory,
  DirectoryAcessor,
  DirectoryRepository
> {
  constructor(private _http$: HttpClient) {
    super(() => new HateoasDirectory(), new DirectoryAcessor(), _http$, ApiEndpoint.DIRECTORIES);
  }
}
