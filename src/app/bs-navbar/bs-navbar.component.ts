import { AppUser } from './../models/user';
import { AuthService } from '../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  user: AppUser;
  constructor(public auth: AuthService) {
    auth.appUser$.subscribe((appUser: AppUser) => (this.user = appUser));
  }

  logout(): void {
    this.auth.logout();
  }
}
