import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionComponent } from './permission.component';
import { DialogComponent } from './dialog/dialog.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [PermissionComponent, DialogComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PermissionModule { }
