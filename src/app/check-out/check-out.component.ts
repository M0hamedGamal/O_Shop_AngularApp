import { Router } from '@angular/router';
import { AuthService } from './../services/auth/auth.service';
import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from '../services/order/order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cartSubscription: Subscription;
  userSubscription: Subscription;
  cart: ShoppingCart;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();

    this.cartSubscription = cart$.subscribe((cart) => (this.cart = cart));
    this.userSubscription = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);

    let result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
