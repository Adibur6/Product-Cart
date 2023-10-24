import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() productName: string='';
  @Input() productId: string='';
  @Input() price: number=0;
  @Input() unit: string='';
  @Input() availableAmount: number=0;

  quantity: number = 0;

  addToCart() {
    // Implement your logic to add the product to the cart here
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
