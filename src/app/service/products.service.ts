import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products = [
    {
      id: "asd",
      name: 'Product 1',
      price: 10.99,
      unit: 'pcs',
      availableAmount: 50,
    },
    {
      id: "2asd",
      name: 'Product 2',
      price: 15.99,
      unit: 'pcs',
      availableAmount: 30,
    },
    
  ];

  getProducts() {
    return this.products;
  }

  getProductById(id: string) {
    return this.products.find(product => product.id === id);
  }

  addProduct(product: any) {
    // Generate a unique ID for the new product (for example, increment the highest current ID)
   
    // Push the new product to the products array
    this.products.push(product);
  }
  removeProduct(productId: string) {
    const productIndex = this.products.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
    }
  }

  editProduct(product: any) {
    // Implement the logic to edit an existing product in the products array
    const existingProductIndex = this.products.findIndex(p => p.id === product.id);
    if (existingProductIndex !== -1) {
      // Update the existing product
      this.products[existingProductIndex] = product;
    }
  }

  // Method to update selectedAmount for a product
  updateSelectedAmount(productId: string, selectedAmount: number, productToUpdate: any) {
    const product = this.products.find(p => p.id === productId);
  
    if (product) {
      product.availableAmount += selectedAmount;
    } else {
      // If the product is not found, add it to the products array
      this.addProduct(productToUpdate);
    }
  }
  
}
