import { ShoppingCart } from 'shared/models/shopping-cart';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth/auth.service';
import { OrderService } from 'shared/services/order/order.service';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order';

@Component({
  selector: 'shippig-form',
  templateUrl: './shippig-form.component.html',
  styleUrls: ['./shippig-form.component.css'],
})
export class ShippigFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {};
  subscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);

    let result = await this.orderService.placeOrder(order);

    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
