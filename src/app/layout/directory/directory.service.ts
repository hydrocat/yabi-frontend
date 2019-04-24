import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DirectoryRepository, HateoasDirectory } from './directory.model';
import { ApiEndpoint } from '../../shared/services/apiEndpoint';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private http$: HttpClient, private api: ApiEndpoint) { }

  index(): Observable<HateoasDirectory[]> {
    return this.http$.get<DirectoryRepository>(this.api.DIRECTORIES).pipe(
      map(
        (pr: DirectoryRepository): HateoasDirectory[] => {
          return pr._embedded.directories.map(d => {
            return Object.assign(new HateoasDirectory(), d);
          });
        }
      )
    );
  }
}
