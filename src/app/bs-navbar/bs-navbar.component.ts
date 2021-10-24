import { Observable } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { AppUser } from './../models/user';
import { AuthService } from '../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  user: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(
    public auth: AuthService,
    private shoppingCart: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser: AppUser) => (this.user = appUser));

    this.cart$ = await this.shoppingCart.getCart();
  }

  logout(): void {
    this.auth.logout();
  }
}
