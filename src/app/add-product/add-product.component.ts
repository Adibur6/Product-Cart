import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productId: any;
  product = {
    name: '',
    id: 0, // Change 'id' to a number
    price: 0,
    unit: '',
    availableAmount: 0
  };

  constructor(private route: ActivatedRoute, private productService: ProductsService) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id'); // Get the product ID from the route parameter

    if (this.productId) {
      // Editing an existing product
      this.product = this.productService.getProductById(this.productId) || this.product;
    }
  }

  onSubmit() {
    if (this.productId) {
      // Handle the edit operation
      this.productService.editProduct(this.product);
      console.log('Product edited:');
    } else {
      // Handle the add operation
      this.productService.addProduct(this.product);
      console.log('Product added:');
    }

    console.log(this.product);
  }
}
