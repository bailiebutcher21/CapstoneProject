import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FirestoreService } from '../core/firestore.service';
import { AuthService } from '../core/auth.service';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { NewUserComponent } from './new-user/new-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl();
  password = new FormControl();

  constructor(
    private firestore: FirestoreService,
    private auth: AuthService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.auth.googleLogin()
    .then(() => {
      this.dialogRef.close();
    })
    .catch((error) => {
      const snackBarRef = this.snackBar.open(error.message, 'hide', {duration: 4000});
    });
  }

  loginWithFacebook() {
    this.auth.facebookLogin()
    .then(() => {
      this.dialogRef.close();
    })
    .catch((error) => {
      const snackBarRef = this.snackBar.open(error.message, 'hide', {duration: 4000});
    });
  }

  signOut() {
    this.auth.signOut();
  }

  createAccount() {
    const newUserRef = this.dialog.open(NewUserComponent);
    newUserRef.afterClosed().subscribe(() => {
      this.dialogRef.close();
    });
  }

}
