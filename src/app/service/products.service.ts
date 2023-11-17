import { Injectable } from '@angular/core';
import { Product } from '../interface/product.interface'; // Import the Product interface
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://product-cart-api.onrender.com/products';
  private products: Product[] = [];
  constructor(private http: HttpClient) {
    this.getProducts().subscribe(()=>{});
  }

  getProducts(): Observable<Product[]> {
    if (this.products.length > 0) {
      return of(this.products); // Return cached products if available
    } else {
      return this.http.get<Product[]>(this.apiUrl).pipe(
        tap((products) => {
          this.products = products; // Cache the retrieved data
        })
      );
    }
  }

  getProductById(id: string) {
    return this.products.find((product) => product.id === id);
  }

  addProduct(product: Product): void {
    if (this.products.length === 0) {
      // Call the API to fetch products
      this.http.get<Product[]>(this.apiUrl).subscribe((products) => {
        this.products = products; // Cache the retrieved data
        this.products.push(product);
        // do a post request here after caching
        this.http.post(this.apiUrl, product).subscribe(
          (response) => {
            // Handle a successful response here
            console.log('Success:', response);

            // You can update the product with data from the response if needed
            // For example, if the API assigns an ID to the product
          },
          (error) => {
            // Handle errors here
            console.error('Error:', error);
          }
        );
      });
    } else {
      // If products are already cached, push the new product to the array
      this.products.push(product);

      // Send a POST request to add the product to the API
      this.http.post(this.apiUrl, product).subscribe(
        (response) => {
          // Handle a successful response here
          console.log('Success:', response);

          // You can update the product with data from the response if needed
          // For example, if the API assigns an ID to the product
        },
        (error) => {
          // Handle errors here
          console.error('Error:', error);
        }
      );
    }
  }

  removeProduct(productId: string): void {
    console.log(productId);
    console.log(this.products);
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    );
    console.log("delete try 1.");
    if (productIndex !== -1) {
      // Remove the product from the local array
      this.products.splice(productIndex, 1);
      console.log("delete try 2.");

      // Send a DELETE request to remove the product from the API
      this.http.delete(`${this.apiUrl}/${productId}`).subscribe((response) => {
        console.log('DELETE request was successful.',response);
      },(response) => {
        console.log('DELETE request was unsuccessful.',response);
      });
    }
  }

  editProduct(product: Product): void {
    if (this.products.length === 0) {
      // Fetch products from the API
      this.fetchProductsFromAPI().subscribe((fetchedProducts) => {
        this.products = fetchedProducts;
        this.updateProductInArray(product);
        this.http.put(`${this.apiUrl}/${product.id}`, product).subscribe(() => {
          console.log('PUT request was successful.');
        });
      });
    } else {
      // Check if the product exists in the local array
      const existingProduct = this.products.find((p) => p.id === product.id);
      if (existingProduct) {
        this.updateProductInArray(product);

        // Call the PUT method on the API to update the product
        this.http.put(`${this.apiUrl}/${product.id}`, product).subscribe(() => {
          console.log('PUT request was successful.');
        });
      }
    }
  }
  private updateProductInArray(product: Product): void {
    const existingProductIndex = this.products.findIndex(
      (p) => p.id === product.id
    );
    if (existingProductIndex !== -1) {
      // Update the existing product in the array
      this.products[existingProductIndex] = product;
    }
  }
  private fetchProductsFromAPI(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Method to update selectedAmount for a product
  updateSelectedAmount(
    productId: string,
    selectedAmount: number,
    productToUpdate: any
  ): void {
    const product = this.products.find((p) => p.id === productId);
    const productIndex = this.products.findIndex(
      (product) => product.id === productId
    );
    console.log(product);
    

    if (product) {
      // Update the available amount locally
      product.availableAmount += selectedAmount;

      if (product.availableAmount == 0) {
        this.products.splice(productIndex, 1);
        
        this.http.delete(`${this.apiUrl}/${productId}`).subscribe(() => {
          console.log('DELETE request was successful.');
        });

      } else {
        this.products[productIndex]=product;
        this.http.put(`${this.apiUrl}/${productId}`, product).subscribe(() => {
          console.log(
            'PUT request for updating selected amount was successful.'
          );
        });
      }

      // Send a PUT request to update the available amount on the server
    } else {
      // If the product is not found, add it to the products array
      this.addProduct(productToUpdate);
    }
  }
}
