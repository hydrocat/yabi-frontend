import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './directory.component';
import { SharedModule } from '../../shared/shared.module';
import { DirectoryFormNewComponent } from './directory-form-new/directory-form-new.component';

@NgModule({
  declarations: [DirectoryComponent, DirectoryFormNewComponent],
  imports: [CommonModule, SharedModule],
  entryComponents: [DirectoryFormNewComponent]
})
export class DirectoryModule {}
