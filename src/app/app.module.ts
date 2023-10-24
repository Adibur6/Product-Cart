import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductTableComponent,
    MyCartComponent,
    CardComponent,
    PaginationComponent,
    AddProductComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,FormsModule], // Add the AppRoutingModule here
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
