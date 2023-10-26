import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service'; // Import the ProductsService

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any[] = []; // Define the product array
  itemsPerPage = 10; // Number of items to display per page
  currentPage = 1;

  constructor(private productsService: ProductsService) {} // Inject the ProductsService

  ngOnInit() {
    // Fetch product data from the service when the component initializes
     this.productsService.getProducts().subscribe(products => this.products=products);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
