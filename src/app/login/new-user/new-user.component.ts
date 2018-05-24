import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public dialogRef: MatDialogRef<NewUserComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  signInWithGoogle() {
    this.auth.googleLogin()
    .then(() => {
      this.dialogRef.close();
    })
    .catch((error) => {
      const snackBarRef = this.snackBar.open(error.message, 'hide', {duration: 4000});
    });
  }

  signInWithFacebook() {
    this.auth.facebookLogin()
    .then(() => {
      this.dialogRef.close();
    })
    .catch((error) => {
      const snackBarRef = this.snackBar.open(error.message, 'hide', {duration: 4000});
    });
  }

}
