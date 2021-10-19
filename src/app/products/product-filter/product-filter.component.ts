import { Component, Input, OnInit } from '@angular/core';
import { SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category/category.service';

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
