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
import { FormGroup, FormControl } from '@angular/forms';
import { Query, HateoasQuery } from '../../query.model';
import { genericFormControl } from '../../../../shared/modules/genericFormControl/genericFormControl';
import { Subject, Observable, of } from 'rxjs';
import { PermissionService } from '../../../permission/permission.service';
import { Permission } from '../../../permission/permission.model';
import { Directory } from '../../../directory/directory.model';
import { DirectoryService } from '../../../directory/directory.service';
import { takeUntil } from 'rxjs/operators';

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
  public permissisons: Observable<Permission[]>;
  public directories: Observable<Directory[]>;
  private _unsubscribe: Subject<void> = new Subject();

  constructor(
    private deirectory$: DirectoryService,
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
    this.directories = this.deirectory$.index();
    this.permissisons = this.permission$.index();
    this.form = genericFormControl(this.query, ['id']);
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.unsubscribe();
  }

  onSubmit() {
    if (this.isEdit) {
      throw new Error('Edit not implemented yet');
    } else {
      console.log('Query save');
      this.query$
        .create(this.form.value)
        .pipe(takeUntil(this._unsubscribe))
        .subscribe(q => this.saved.emit(Object.assign(new HateoasQuery(), q)));
    }
  }
}
