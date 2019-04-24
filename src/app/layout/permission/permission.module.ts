import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionComponent } from './permission.component';
import { SharedModule } from '../../shared/shared.module';
import { PermissionFormEditComponent } from './permission-form-edit/permission-form-edit.component';
import { PermissionFormNewComponent } from './permission-form-new/permission-form-new.component';

@NgModule({
  declarations: [PermissionComponent, PermissionFormEditComponent, PermissionFormNewComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [PermissionFormEditComponent, PermissionFormNewComponent]
})
export class PermissionModule { }
