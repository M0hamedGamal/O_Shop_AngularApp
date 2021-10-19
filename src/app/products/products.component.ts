import { ProductService } from './../services/product/product.service';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
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
  }
}
