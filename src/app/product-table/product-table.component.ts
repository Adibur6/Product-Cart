import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit {
  products: any[] = [];
  itemsPerPage = 10; // Number of items to display per page
  currentPage = 1;
  selectedSortField:any;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }
  onSortOptionSelected() {
    // Implement your sorting logic here when a new option is selected
    console.log('Sorting by:', this.selectedSortField);
  
    // Sort the products array based on the selectedSortField
    this.products.sort((a, b) => {
      if (this.selectedSortField === 'name') {
        // Sort by product name
        return a.name.localeCompare(b.name);
      } else if (this.selectedSortField === 'price') {
        // Sort by product price
        return a.price - b.price;
      } else {
        // No sorting (selectedSortField is 'none')
        return 0;
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  deleteProduct(product: any) {
    // Find the index of the product to delete
    const productIndex = this.products.findIndex(p => p.id === product.id);

    if (productIndex !== -1) {
      // Remove the product from the local products array
      this.products.splice(productIndex, 1);

      // Remove the product from the ProductsService
      this.productsService.removeProduct(product.id);
    }
  }
}
