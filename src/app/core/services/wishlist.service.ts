import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, Response } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) {}

  addToWishlist(productId: string): Observable<{ message: string }> {
    this.toastr.success('Product added to wishlist', 'Success');
    return this.http.post<{ message: string }>(`${environment.BaseURL}/wishlist`, { productId });
  }

  removeFromWishlist(productId: string): Observable<{ message: string }> {
    this.toastr.success('Product removed from wishlist', 'Success');
    return this.http.delete<{ message: string }>(`${environment.BaseURL}/wishlist/${productId}`);
  }

  getWishlist(): Observable<Response<Product>> {
    return this.http.get<Response<Product>>(`${environment.BaseURL}/wishlist`);
  }
}
