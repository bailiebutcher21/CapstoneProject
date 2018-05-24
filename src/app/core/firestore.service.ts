import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { User } from '@firebase/auth-types';
import { AuthService } from './auth.service';

@Injectable()
export class FirestoreService {

  private userCollection: AngularFirestoreCollection<User>;
  users: User[];

  constructor(
    private afs: AngularFirestore
  ) {
    this.userCollection = afs.collection<User>('users');
    this.userCollection.valueChanges().subscribe((users) => {
      this.users = users;
    });
  }

}
