import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Directory, DirectoryRepository } from './directory.model';
import { ApiEndpoint } from '../../shared/services/apiEndpoint';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private http$: HttpClient, private api: ApiEndpoint) { }

  index(): Observable<Directory[]> {
    return this.http$.get<DirectoryRepository>(this.api.DIRECTORIES).pipe(
      map(
        (pr: DirectoryRepository): Directory[] => {
          return pr._embedded.directories.map(p => {
            return Object.assign(new Directory(), p);
          });
        }
      )
    );
  }
}
