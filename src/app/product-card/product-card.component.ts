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

  addToCart(product) {
    console.log(this.shoppingCart);

    this.cartService.addToCart(product);
  }

  getQuantity(): number {
    if (!this.shoppingCart) return 0;

    let item = this.shoppingCart.items[this.product.title];

    return item ? item.quantity : 0;
  }
}
