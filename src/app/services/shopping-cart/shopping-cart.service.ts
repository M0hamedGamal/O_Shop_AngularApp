import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from './../../models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      createdDate: new Date().getTime(),
    });
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
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

  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId();
    let getItem = this.getItem(cartId, product.title);
    let item$ = getItem.valueChanges() as Observable<any>;

    item$.pipe(take(1)).subscribe((item) => {
      getItem.update({
        product: product,
        quantity: (item ? item.quantity : 0) + 1,
      });
    });
  }
}
