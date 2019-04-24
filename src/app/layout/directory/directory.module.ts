import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './directory.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DirectoryComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
})
export class DirectoryModule { }
