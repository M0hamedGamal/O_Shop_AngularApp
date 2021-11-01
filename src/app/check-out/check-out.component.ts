import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private cartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }
}
