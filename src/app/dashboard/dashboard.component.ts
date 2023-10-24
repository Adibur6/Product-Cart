import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  products: any[]; // Define the product array
  itemsPerPage = 10; // Number of items to display per page
  currentPage = 1;

  constructor() {
    this.products = [
      {
        name: 'Product 1',
        id: '12345',
        price: 10.99,
        unit: 'pcs',
        availableAmount: 50
      },
      {
        name: 'Product 2',
        id: '67890',
        price: 15.99,
        unit: 'pcs',
        availableAmount: 30
      },
      {
        name: 'Product 1',
        id: '12345',
        price: 10.99,
        unit: 'pcs',
        availableAmount: 50
      }
      
      
      // Add more product data as needed
    ];
  }
  onPageChange(page: number) {
    this.currentPage = page;
  }
}
