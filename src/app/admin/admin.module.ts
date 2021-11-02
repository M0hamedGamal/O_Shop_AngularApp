import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminAuthGuard } from './services/admin-auth-guard/admin-auth-guard.service';
import { AuthGuard } from 'shared/services/auth-guard/auth-guard.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminProductFormComponent,
    AdminOrdersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin/products/new',
        component: AdminProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: 'admin/products/:id',
        component: AdminProductFormComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
      {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard],
      },
    ]),
  ],
  exports: [
    AdminProductsComponent,
    AdminProductFormComponent,
    AdminOrdersComponent,
  ],
  providers: [AdminAuthGuard],
})
export class AdminModule {}
