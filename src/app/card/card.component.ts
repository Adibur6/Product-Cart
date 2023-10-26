import { Component, Input } from '@angular/core';
import { MyProductsService } from '../service/my-products.service'; // Import MyProductsService
import { ProductsService } from '../service/products.service'; // Import ProductsService

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() productName: string = '';
  @Input() productId: string = '';
  @Input() price: number = 0;
  @Input() unit: string = '';
  @Input() availableAmount: number = 0;
  @Input() selectedAmount: number = 0;
  @Input() isDashboardCard: boolean = true;

  quantity: number = 0;

  constructor(private myProductsService: MyProductsService, private productsService: ProductsService) {} // Inject MyProductsService and ProductsService

  addToCart() {
    if (this.quantity > 0) {
      // Add the product to the cart (my-products.service)
      this.myProductsService.addProduct({
        id: this.productId,
        name: this.productName,
        price: this.price,
        unit: this.unit,
        selectedAmount: this.quantity
      });

      // Update the selectedAmount in the ProductsService
      this.productsService.updateSelectedAmount(this.productId, -this.quantity,{});

      // Reset the quantity input
      this.quantity = 0;
    }
  }

  removeFromCart() {
    // Remove the product from the cart (my-products.service)
    this.myProductsService.removeProduct(this.productId);
  
    // Create an object with the product data to send to the updateSelectedAmount method
    const productToUpdate = {
      id: this.productId,
      name: this.productName,
      price: this.price,
      unit: this.unit,
      availableAmount: this.selectedAmount,
      
    };
  
    // Update the selectedAmount in the ProductsService
    this.productsService.updateSelectedAmount(this.productId, this.selectedAmount, productToUpdate);
  
    // Reset the quantity input and selectedAmount
    this.quantity = 0;
  }
  

  incrementQuantity() {
    if (this.quantity < this.availableAmount) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
}
