import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { CoreModule } from '../core/core.module';
import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  entryComponents: [
    LoginComponent,
    NewUserComponent
  ],
  declarations: [
    LoginComponent,
    NewUserComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
