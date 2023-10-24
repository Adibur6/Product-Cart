import { Component } from '@angular/core';
import { MyProductsService } from '../service/my-products.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent {
  products: any[]; // Array to store product data
  itemsPerPage = 10; // Number of items to display per page
  currentPage = 1;

  constructor(private myProductsService: MyProductsService) {
    this.products=[]
  }

  ngOnInit() {
    // Fetch product data from the service
    this.products = this.myProductsService.getProducts();
  }

  getTotalAmount(): number {
    return this.products.reduce(
      (total, product) => total + product.price,
      0
    );
  }
  onPageChange(page: number) {
    this.currentPage = page;
  }
}
