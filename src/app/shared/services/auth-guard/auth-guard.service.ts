import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.user$.pipe(
      map((user) => {
        if (user) return true; // true that's meaning he is logged in.

        // If a user tries to reach any page by typing a Uri and he isn't logged in in our system.
        // Redirect him to login page and store his uri [was trying to reach]
        // to redirect him to his uri after loggin in. [Thanks to state.url]
        this.router.navigate(['/login'], {
          queryParams: {
            returnUrl: state.url,
          },
        });
        return false; // false that's meaning he isn't logged in.
      })
    );
  }
}
