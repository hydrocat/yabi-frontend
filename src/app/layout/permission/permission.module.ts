import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionComponent } from './permission.component';
import { SharedModule } from '../../shared/shared.module';
import { PermissionFormComponent } from './permission-form/permission-form.component';

@NgModule({
  declarations: [PermissionComponent, PermissionFormComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [PermissionFormComponent]
})
export class PermissionModule { }
