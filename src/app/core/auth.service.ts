import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { User } from './interfaces/user.interface';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  // tslint:disable-next-line:no-any
  public authState: any = null;
  public userObservable: Subject<User>;
  private user: User | null = null;
  private userDoc: AngularFirestoreDocument<User> = null;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.userCollection = afs.collection<User>('users');
    this.userObservable = new Subject();
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      if (this.authenticated) {
        this.setUserDoc();
        this.setUser();
        if (this.newUser) {
          this.addUser();
        }
      }
    });
  }

  // Auth guard
  public authGuard(): boolean {
    return this.authenticated;
  }

  // checkers for authentication and database info to avoid errors
  // returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // returns true if the userDoc is set
  get userDocSet(): boolean {
    return this.userDoc !== null;
  }

  // tests to see if the user is set
  get userIsSet(): boolean {
    return this.user !== null;
  }

  // finds if it is a new user
  get newUser(): boolean | Error {
    return this.authenticated && this.userDocSet && !this.userIsSet;
  }

  // grab info off of the user property.
  // returns the current user
  get currentUser(): User | null {
    return this.authenticated ? this.user : null;
  }

  // returns the current users uid
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // returns current users display name
  get currentUserDisplayName(): string {
    return this.authenticated ? this.authState['displayName'] || 'User without a Name' : 'Guest';
  }

  // returns current users email
  get currentUserEmail(): string {
    return this.authenticated ? this.authState.email : '';
  }

  // return user auth provider
  get provider(): string {
    return this.authenticated ? this.authState.providerData[0].providerId : '';
  }

  // login types
  // google login
  public googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return new Promise((resolve, reject) => {
      this.socialSignIn(provider)
      .catch(error => {
        reject(error);
      });
    });
  }

  // facebook login
  public facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return new Promise((resolve, reject) => {
      this.socialSignIn(provider)
      .catch(error => {
        reject(error);
      });
    });
  }

  // the login service called in both
  private socialSignIn(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  // signing out
  signOut(): void {
    this.afAuth.auth.signOut();
    this.user = null;
    this.userObservable.next(this.user);
  }

  // this adds the user to firestore
  private addUser() {
    this.userDoc.set({
      uid: this.currentUserId,
      name: this.currentUserDisplayName,
      email: this.currentUserEmail,
      provider: this.provider,
      friends: [],
      wishList: []
    });
  }

  // this sets the private user property
  private setUser(): User | null {
    if (this.authenticated) {
      this.userDoc.valueChanges().subscribe((user) => {
        this.user = user;
        this.userObservable.next(this.user);
      });
    } else {
      this.user = null;
    }
    return this.user;
  }

  // this sets the userDoc property
  private setUserDoc() {
    this.userDoc = this.afs.doc<User>(`users/${this.currentUserId}`);
  }

}
