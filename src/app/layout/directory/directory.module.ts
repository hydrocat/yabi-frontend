import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './directory.component';
import { SharedModule } from '../../shared/shared.module';
import { DirectoryFormNewComponent } from './directory-form-new/directory-form-new.component';
import { DirectoryFormEditComponent } from './directory-form-edit/directory-form-edit.component';

@NgModule({
  declarations: [DirectoryComponent, DirectoryFormNewComponent, DirectoryFormEditComponent],
  imports: [CommonModule, SharedModule],
  entryComponents: [DirectoryFormEditComponent, DirectoryFormNewComponent]
})
export class DirectoryModule {}
