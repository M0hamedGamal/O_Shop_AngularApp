import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  public items: ShoppingCartItem[] = [];

  constructor(private itemsMap: ShoppingCartItem[] = []) {
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }

  getQuantity(product: Product): number {
    let item = this.itemsMap[product.title];

    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (let item of this.items) {
      sum += item.totalPrice;
    }

    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap)
      count += this.itemsMap[productId].quantity;
    return count;
  }
}
