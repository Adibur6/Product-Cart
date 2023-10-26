import { Component } from '@angular/core';
import { MyProductsService } from '../service/my-products.service';
import { MyProduct } from '../interface/myProduct.interface';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css'],
})
export class MyCartComponent {
  products: MyProduct[]; // Array to store product data
  itemsPerPage = 10; // Number of items to display per page
  currentPage = 1;

  constructor(private myProductsService: MyProductsService) {
    this.products=[]
  }

  ngOnInit() {
    // Fetch product data from the service
    this.myProductsService.getProducts().subscribe(products=>this.products=products);
    console.log(this.products);
  }

  getTotalAmount(): number {
    return this.products.reduce(
      (total, product) => total + product.price*product.selectedAmount,
      0
    );
  }
  clearProducts()
  {
    this.products=[];
    this.myProductsService.checkin();
    console.log("checkin");
  }
  onPageChange(page: number) {
    this.currentPage = page;
  }
}
