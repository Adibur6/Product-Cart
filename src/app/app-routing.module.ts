import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product-table', component: ProductTableComponent },
  { path: 'my-cart', component: MyCartComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'edit-product/:id', component: AddProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
