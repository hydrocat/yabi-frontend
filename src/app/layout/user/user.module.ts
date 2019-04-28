import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { UserComponent } from './user.component';
import { UserShowComponent } from './user-show/user-show.component';

@NgModule({
  declarations: [UserComponent, UserShowComponent],
  imports: [CommonModule, SharedModule],
  entryComponents: [UserShowComponent]
})
export class UserModule {}
