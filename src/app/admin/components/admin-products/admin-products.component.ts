import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SnapshotAction } from '@angular/fire/database';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: SnapshotAction<Product>[];
  filteredProducts: SnapshotAction<Product>[];
  subscription: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productService
      .getAll()
      .snapshotChanges()
      .subscribe(
        (result: SnapshotAction<Product>[]) =>
          (this.filteredProducts = this.products = result)
      );
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p: SnapshotAction<Product>) =>
          p.payload.val().title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
