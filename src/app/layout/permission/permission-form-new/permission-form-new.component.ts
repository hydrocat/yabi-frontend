import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { HateoasPermission, Permission } from '../permission.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { genericFormControl } from '../../../shared/modules/genericFormControl/genericFormControl';
import { DirectoryService } from '../../directory/directory.service';
import { HateoasDirectory } from '../../directory/directory.model';
import { PermissionService } from '../permission.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './permission-form-new.component.html',
  styleUrls: ['./permission-form-new.component.scss']
})
export class PermissionFormNewComponent implements OnInit {
  public form: FormGroup;
  public permission = new Permission();
  public submition = new EventEmitter<HateoasPermission>(true);

  constructor(
    private permission$: PermissionService,
    @Inject(MAT_DIALOG_DATA)
    public parent: HateoasPermission
  ) {}

  ngOnInit() {
    this.form = genericFormControl(this.permission, ['id']);
  }

  onSubmit() {
    Object.assign(this.permission, this.form.value);
    this.permission.parent = this.parent.uri;
    this.permission.nodePath =
      this.parent.nodePath === '/'
        ? `/${this.permission.nodePath}`
        : `${this.parent.nodePath}/${this.permission.nodePath}`;
    this.permission$.create(this.permission)
    .subscribe( p => this.submition.emit(p) );
    }
}
