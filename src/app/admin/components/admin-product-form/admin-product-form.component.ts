import { SnapshotAction } from '@angular/fire/database';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product/product.service';
import { CategoryService } from 'shared/services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css'],
})
export class AdminProductFormComponent implements OnInit {
  categories$: Observable<SnapshotAction<any>[]>;
  product: Product = new Product();
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll().snapshotChanges();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id)
      this.productService
        .get(this.id)
        .snapshotChanges()
        .pipe(take(1)) // 'take operator' like unsubscribe. take only '1' observable.
        .subscribe((p: any) => (this.product = p.payload.val()));
  }

  submit(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);

    this.router.navigate(['/admin/products']);
  }
}
