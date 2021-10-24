import { Product } from './../models/product';
import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;
  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.cartService.addToCart(this.product);

    console.log(this.shoppingCart);
  }
  removeFromCart() {
    this.cartService.removeFromCart(this.product);

    console.log(this.shoppingCart);
  }

  getQuantity(): number {
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.title];

    return item ? item.quantity : 0;
  }
}
