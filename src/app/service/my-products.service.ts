import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyProductsService {
  private products: any[] = [
    {
      name: 'Product 1',
      id: '12345',
      price: 10.99,
      unit: 'pcs',
      selectedAmount: 50,
    },
    {
      name: 'Product 2',
      id: '67890',
      price: 15.99,
      unit: 'pcs',
      selectedAmount: 30,
    },
  ];

  getProducts() {
    return this.products;
  }

  addProduct(newProduct: any) {
    const existingProduct = this.products.find(product => product.id === newProduct.id);
    if (existingProduct) {
      // If a product with the same ID exists, add selectedAmount to it
      existingProduct.selectedAmount += newProduct.selectedAmount;
    } else {
      // If no product with the same ID exists, push the new product to the array
      this.products.push(newProduct);
    }
  }

  removeProduct(productId: string) {
    const productIndex = this.products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
    }
  }
}
