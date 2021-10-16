import { AppUser } from '../../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.user$ = afAuth.authState; // 'authState' Detect if a user logged in or signed out. [Return an object of a user or null.]
  }

  login() {
    // returnUrl is a uri that created into 'AuthGuardService' or if it null set it as a home uri '/'.
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';

    localStorage.setItem('returnUrl', returnUrl); // Store uri into Local Storage.

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()); // Use an Gmail feature to sign in.
  }

  logout() {
    this.afAuth.signOut(); // Sign out.
  }

  // Get a user data from Firebase database.
  // By throw a uid 'that got from user$ observable' to a getUser method into userService.
  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap((user: firebase.User) => {
        if (user) return this.userService.getUser(user.uid).valueChanges();

        return of(null); // return Observable of 'null' if there isn't user logged in.
      })
    );
  }
}
