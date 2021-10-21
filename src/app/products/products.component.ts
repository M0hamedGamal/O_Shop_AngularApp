import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { ProductService } from './../services/product/product.service';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscribtion: Subscription;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCart: ShoppingCartService
  ) {}

  async ngOnInit() {
    (this.productService.getAll().valueChanges() as Observable<Product[]>)
      .pipe(
        switchMap((prds: Product[]) => {
          this.products = prds;
          return this.route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter((p: Product) => p.category == this.category)
          : this.products;
      });

    this.subscribtion = (await this.shoppingCart.getCart()).subscribe(
      (cart) => (this.cart = cart)
    );
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
}
