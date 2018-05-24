import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService } from './auth.service';
import { FirebaseModule } from './firebase/firebase.module';
import { FirestoreService } from './firestore.service';
import { UserService } from './user.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FirebaseModule
  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [],
  providers: [
    AuthService,
    FirestoreService,
    UserService
  ]
})
export class CoreModule { }
