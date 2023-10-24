import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { MyCartComponent } from './my-cart/my-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductTableComponent,
    MyCartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule], // Add the AppRoutingModule here
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
