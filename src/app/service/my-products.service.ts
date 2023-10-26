import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyProduct } from '../interface/myProduct.interface';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MyProductsService {
  private products: MyProduct[] = [];
  private apiUrl = 'http://localhost:3000/myproducts';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<MyProduct[]> {
    if (this.products.length > 0) {
      return of(this.products); // Return cached products if available
    } else {
      return this.http.get<MyProduct[]>(this.apiUrl).pipe(
        tap((products) => {
          this.products = products; // Cache the retrieved data
        })
      );
    }
  }

  addProduct(newProduct: MyProduct): void {
    this.getProducts().subscribe(() => {
      const existingProduct = this.products.find(
        (product) => product.id === newProduct.id
      );
      if (existingProduct) {
        // If a product with the same ID exists, add selectedAmount to it
        console.log(existingProduct);
        existingProduct.selectedAmount += newProduct.selectedAmount;
        this.http
          .put<MyProduct>(`${this.apiUrl}/${newProduct.id}`, existingProduct)
          .subscribe(() => {
            console.log('Put method in my product.');
          });
      } else {
        // If no product with the same ID exists, push the new product to the local array and send a POST request
        this.products.push(newProduct);
        this.http.post<MyProduct>(this.apiUrl, newProduct).subscribe(() => {
          console.log('Post method in my product.');
        });
      }
    });
  }

  removeProduct(productId: string): void {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1)[0];
      this.http.delete<void>(`${this.apiUrl}/${productId}`).subscribe(() => {});
    }
  }

  checkin(): void {
    this.products = [];
    this.http.delete<void>(this.apiUrl).subscribe(() => {
      console.log('My product clear.');
    }); // Clear the products on the server
  }
}
