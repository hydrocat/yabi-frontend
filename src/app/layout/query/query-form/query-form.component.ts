import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { QueryService } from '../query.service';
import { FormGroup } from '@angular/forms';
import { Query, HateoasQuery } from '../query.model';
import { genericFormControl } from '../../../shared/modules/genericFormControl/genericFormControl';
import { Subject, Observable, of } from 'rxjs';
import { PermissionService } from '../../permission/permission.service';
import { HateoasPermission } from '../../permission/permission.model';
import { HateoasDirectory } from '../../directory/directory.model';
import { DirectoryService } from '../../directory/directory.service';
import {
  takeUntil,
  startWith,
  map,
  tap,
  filter,
  switchMap,
  distinctUntilChanged,
  debounceTime
} from 'rxjs/operators';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.scss']
})
export class QueryFormComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public title: 'New Query' | 'Edit Query';
  public isEdit: boolean;
  @Output() public saved: EventEmitter<HateoasQuery>;
  public permissions: Observable<HateoasPermission[]>;
  public filteredPermissisons: Observable<HateoasPermission[]>;
  public selectedDirectory: HateoasDirectory;
  public directories: Observable<HateoasDirectory[]>;
  public directory: any;
  private _unsubscribe: Subject<void> = new Subject();
  private changedKeys: string[] = [];

  /* public _displayPermission = (permisisonUri?: string) => {
    return permisisonUri
      ? this.permissions.find(p => p.uri === permisisonUri).nodePath
      : permisisonUri;
  } */

  constructor(
    private directory$: DirectoryService,
    private permission$: PermissionService,
    private query$: QueryService,
    @Inject(MAT_DIALOG_DATA) public query: Query | null
  ) {}

  compareDirectory(a: string, b: number) {
    if (a === null || b === null) {
      return;
    }
    return a.endsWith(b.toString());
  }

  ngOnInit() {
    this.saved = new EventEmitter(true);
    if (!this.query) {
      this.isEdit = false;
      this.title = 'New Query';
      this.query = new Query();
    } else {
      this.isEdit = true;
      this.title = 'Edit Query';
    }

    this.form = genericFormControl(this.query, ['id']);
    // Directories
    this.directories = this.directory$.index();
    // Permisison
    this.filteredPermissisons = this.form.get('permission').valueChanges.pipe(
      startWith(''),
      debounceTime(SharedModule.debounceTime),
      distinctUntilChanged(),
      switchMap(searchText => this.searchPermissions(searchText))
    );
  }

  private searchPermissions(value: string): Observable<HateoasPermission[]> {
    // It's okay to request the service quickly because it has a temporal cache
    return this.permission$
      .index()
      .pipe(
        map(array =>
          array.filter(permission =>
            permission.nodePath.toLowerCase().startsWith(value.toLowerCase())
          )
        )
      );
  }

  public displayPermission = (text: string): string => {
    let nodePath = '';
    this.permission$.index().subscribe(permissions => {
      nodePath = permissions.find(p => p.uri === text).nodePath;
    });

    if (nodePath === '') {
      return text;
    } else {
      return nodePath;
    }
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.unsubscribe();
  }

  onSubmit() {
    if (this.isEdit) {
      this.query$
        .find(this.query.id)
        .subscribe((hateoasQuery: HateoasQuery) => {
          // Send only the changed fields
          Object.keys(this.query)
            .filter(key => this.form.value[key] !== this.query[key] && key !== 'id')
            .forEach(key => hateoasQuery[key] = this.form.value[key]);

          this.query$
            .patch(hateoasQuery)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(q => this.saved.emit(q));
        });
    } else {
      this.query$
        .create(this.form.value)
        .pipe(takeUntil(this._unsubscribe))
        .subscribe(q => this.saved.emit(q));
    }
  }
}
