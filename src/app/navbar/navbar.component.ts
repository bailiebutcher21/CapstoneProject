import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../core/auth.service';
import { User } from '../core/interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User;
  loggedIn: boolean = false;

  constructor(
    public dialog: MatDialog,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.userObservable.subscribe((user) => {
      this.user = user;
      this.loggedIn = user !== null;
      if (this.loggedIn) {
        this.user.name = user.name !== '' ? user.name : user.email;
      }
    });
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent);
  }

  logout() {
    this.auth.signOut();
  }

}
