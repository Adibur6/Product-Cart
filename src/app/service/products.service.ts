import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'Product 1',
      price: 10.99,
      unit: 'pcs',
      availableAmount: 50,
    },
    {
      id: 2,
      name: 'Product 2',
      price: 15.99,
      unit: 'pcs',
      availableAmount: 30,
    },
  ];

  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }

  addProduct(product: any) {
    // Implement the logic to add a new product to the products array
    // You may need to generate a unique ID for the new product
    this.products.push(product);
  }

  editProduct(product: any) {
    // Implement the logic to edit an existing product in the products array
    const existingProduct = this.products.find(p => p.id === product.id);
    if (existingProduct) {
      Object.assign(existingProduct, product);
    }
  }
}
