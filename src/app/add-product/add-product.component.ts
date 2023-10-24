import { Component } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product = {
    name: '',
    id: '',
    price: 0,
    unit: '',
    availableAmount: 0
  };

  onSubmit() {
    console.log('Product added:');
    console.log(this.product);
  }
}
