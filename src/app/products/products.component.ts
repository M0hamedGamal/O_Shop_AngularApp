import { ProductService } from './../services/product/product.service';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CategoryService } from '../services/category/category.service';
import { Category } from '../models/category';
import { SnapshotAction } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$: Observable<SnapshotAction<Category>[]>;
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    (productService.getAll().valueChanges() as Observable<Product[]>)
      .pipe(
        switchMap((prds: Product[]) => {
          this.products = prds;
          return route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter((p: Product) => p.category == this.category)
          : this.products;
      });

    this.categories$ = categoryService.getAll().snapshotChanges() as Observable<
      SnapshotAction<Category>[]
    >;
  }
}
