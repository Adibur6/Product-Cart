import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../service/products.service';
import { Router } from '@angular/router';
import { Product } from '../interface/product.interface';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productId: string | null=null;
  isAddPage: boolean = true;
  product: Product = {
    name: '',
    id: '',
    price: 0,
    unit: '',
    availableAmount: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id'); // Get the product ID from the route parameter

    if (this.productId) {
      // Editing an existing product
      const existingProduct = this.productService.getProductById(this.productId);
      if (existingProduct) {
        this.product = { ...existingProduct }; // Create a copy of the existing product
        this.isAddPage = false;
      }
    } else {
      this.generateRandomProductId();
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
    this.router.navigate(['/product-table']); 
  }

  private generateRandomProductId() {
    const characters = '0123456789QWERTYUIOPASDFGHJKLZXCVBNM'; // Possible characters for the random string.
    let result = '';

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    this.product.id = result;
  }
}
