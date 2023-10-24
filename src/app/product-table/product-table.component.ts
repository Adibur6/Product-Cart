import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit {
  products: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

  editProduct(product: any) {
    // Implement the edit action here
    console.log('Editing product:', product);
  }

  deleteProduct(product: any) {
    // Implement the delete action here
    console.log('Deleting product:', product);
  }
}
