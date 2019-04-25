import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { QueryService } from '../../query.service';
import { FormGroup } from '@angular/forms';
import { Query, HateoasQuery } from '../../query.model';
import { genericFormControl } from '../../../../shared/modules/genericFormControl/genericFormControl';
import { Subject, Observable, of } from 'rxjs';
import { PermissionService } from '../../../permission/permission.service';
import { HateoasPermission } from '../../../permission/permission.model';
import { HateoasDirectory } from '../../../directory/directory.model';
import { DirectoryService } from '../../../directory/directory.service';
import { takeUntil, startWith, map, tap } from 'rxjs/operators';

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
  public permissions: HateoasPermission[] = [];
  public filteredPermissisons: Observable<HateoasPermission[]>;
  public directories: HateoasDirectory[];
  public directory: any;
  private _unsubscribe: Subject<void> = new Subject();

  public _displayPermission = (permisisonUri?: string) => {
    return permisisonUri
      ? this.permissions.find(p => p.uri === permisisonUri).nodePath
      : permisisonUri;
  }

  constructor(
    private directory$: DirectoryService,
    private permission$: PermissionService,
    private query$: QueryService,
    @Inject(MAT_DIALOG_DATA) public query: Query | null
  ) {}

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
    this.form.value.permission = 'asd';
    this.directory$.index().subscribe( dirs => {
      this.directories = dirs;
      this.form.value['directory'] = this.directories.find( d => d.id === this.query.id);
    });
    this.permission$.index().subscribe(values => {
      this.permissions.push(...values);
      this.filteredPermissisons = this.form.valueChanges.pipe(
        map(form => form.permission), // from form to permission value
        map(text => {
          return this.permissions.filter(p => p.nodePath.includes(text));
        })
      );
    });
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.unsubscribe();
  }

  onSubmit() {
    if (this.isEdit) {
      throw new Error('Edit not implemented yet');
    } else {
      this.query$
        .create(this.form.value)
        .pipe(takeUntil(this._unsubscribe))
        .subscribe(q => this.saved.emit(Object.assign(new HateoasQuery(), q)));
    }
  }
}
