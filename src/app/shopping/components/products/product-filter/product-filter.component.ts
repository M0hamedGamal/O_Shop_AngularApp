import { Component, Input, OnInit } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
import { CategoryService } from 'shared/services/category/category.service';
import { Observable } from 'rxjs';
import { Category } from 'shared/models/category';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  categories$: Observable<SnapshotAction<Category>[]>;
  @Input('category') category;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService
      .getAll()
      .snapshotChanges() as Observable<SnapshotAction<Category>[]>;
  }
}
