import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'shared/services/auth/auth.service';
import { AppUser } from 'shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // appUser$ is a function into a AuthService.
    return this.auth.appUser$.pipe(map((appUser: AppUser) => appUser.isAdmin)); // Return true or false.
  }
}
