import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { HateoasPermission, Permission } from '../permission.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { genericFormControl } from '../../../shared/modules/genericFormControl/genericFormControl';
import { DirectoryService } from '../../directory/directory.service';
import { HateoasDirectory } from '../../directory/directory.model';
import { PermissionService } from '../permission.service';

@Component({
  selector: 'app-form',
  templateUrl: './permission-form-edit.component.html',
  styleUrls: ['./permission-form-edit.component.scss']
})
export class PermissionFormEditComponent implements OnInit {
  public saved = new EventEmitter<HateoasPermission>();
  public form: FormGroup;
  public title: 'New Permission' | 'Edit Permission';
  public isEdit: boolean;

  constructor(
    private permission$: PermissionService,
    @Inject(MAT_DIALOG_DATA)
    public permission: Permission | HateoasPermission | null
  ) {}

  ngOnInit() {
    if (!this.permission) {
      this.title = 'New Permission';
      this.isEdit = false;
      this.permission = new Permission();
    } else if (this.permission instanceof HateoasPermission) {
      this.permission = this.permission.toPermission();
    }
    this.form = genericFormControl(this.permission, ['id'], [{parent: 'teste'}]);
  }

  onSubmit() {
    this.permission$.patch(
      <HateoasPermission> {uri: this.permission.uri, description: this.form.get('description').value}
      ).subscribe( (newPemrission: HateoasPermission) => {
        this.saved.emit(newPemrission);
      });
  }
}
