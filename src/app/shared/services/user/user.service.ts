import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AppUser } from 'shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  // Save a user into a Firebase database by using 'update' method.
  saveUser(user: firebase.User) {
    this.db.object(`/users/${user.uid}`).update({
      name: user.displayName,
      isAdmin: true,
      email: user.email,
    });
  }

  // Get a user from Firebase database by his ID.
  getUser(uid: string): AngularFireObject<AppUser> {
    return this.db.object(`/users/${uid}`);
  }
}
