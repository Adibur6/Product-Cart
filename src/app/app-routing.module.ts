import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { MyCartComponent } from './my-cart/my-cart.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product-table', component: ProductTableComponent },
  { path: 'my-cart', component: MyCartComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
