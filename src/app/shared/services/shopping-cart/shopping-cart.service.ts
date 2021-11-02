import { ShoppingCart } from 'shared/models/shopping-cart';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(map((cart: ShoppingCart) => new ShoppingCart(cart.items)));
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      createdDate: new Date().getTime(),
    });
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();

    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (cartId) return cartId;

    let result = this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let getItem = this.getItem(cartId, product.title);
    let item$ = getItem.valueChanges() as Observable<ShoppingCartItem>;

    item$.pipe(take(1)).subscribe((item) => {
      let quantity = (item ? item.quantity : 0) + change;

      quantity === 0
        ? getItem.remove()
        : getItem.update({
            product: product,
            quantity: quantity,
          });
    });
  }
}
