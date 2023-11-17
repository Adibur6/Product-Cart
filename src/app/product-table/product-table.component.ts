import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';
import { Product } from '../interface/product.interface';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit {
  products: Product[] = [];
  itemsPerPage = 10; // Number of items to display per page
  currentPage = 1;
  selectedSortField:any;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => this.products=products);
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

  deleteProduct(product: Product) {
    
      // Remove the product from the ProductsService
      this.productsService.removeProduct(product.id);
  
  }
}
