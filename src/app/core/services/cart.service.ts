import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CartResponse, Orders, Response, ShippingAddress } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  addToCart(productId: string): Observable<any> {
    return this.http.post(
      `${environment.BaseURL}/cart`,
      { productId },
      // {
      //   headers: {
      //     token: localStorage?.getItem('token') || '',
      //   },
      // },
    );
  }

  updateProductQTY(productId: string, count: number): Observable<CartResponse> {
    return this.http.put<CartResponse>(
      `${environment.BaseURL}/cart/${productId}`,
      { count },
      
    );
  }

  deleteProduct(productId: string): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${environment.BaseURL}/cart/${productId}`, {
      // headers: {
      //   token: localStorage?.getItem('token') || '',
      // },
    });
  }

  deleteCart(): Observable<any> {
    return this.http.delete(`${environment.BaseURL}/cart`, {
      
    });
  }

  getCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${environment.BaseURL}/cart`, {
      
    });
  }

  checkoutSession(cart_id: string, shippingAddress : {details: string, phone: string, city: string}): Observable<{ session: { url: string } }> {
    return this.http.post<{ session: { url: string } }>(
      `${environment.BaseURL}/orders/checkout-session/${cart_id}/?url=${environment.frontURL}`,
      {
        shippingAddress: shippingAddress,
      },
      
    );
  }

 checkoutCash(cart_id: string, shippingAddress: ShippingAddress): Observable<Response<Orders>> {
  return this.http.post<Response<Orders>>(`${environment.BaseURL}/orders/${cart_id}`,
    { shippingAddress }
  );
}

}

