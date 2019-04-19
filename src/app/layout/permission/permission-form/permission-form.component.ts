import { Component, OnInit, Inject } from '@angular/core';
import { HateoasPermission, Permission } from '../permission.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { genericFormControl } from '../../../shared/modules/genericFormControl/genericFormControl';
import { DirectoryService } from '../../directory/directory.service';

@Component({
  selector: 'app-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss']
})
export class PermissionFormComponent implements OnInit {
  public form: FormGroup;
  public title: 'New Permission' | 'Edit Permission';
  public isEdit: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public permission: Permission | HateoasPermission | null,
    public directories$: DirectoryService
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
    console.log('Submit not implemented');
  }
}
