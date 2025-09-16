import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Response } from '../interfaces/api.interface';
import { environment } from '../../../environments/environment.development';

interface PaginationPara{
  limit?: number, 
  page?: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http:HttpClient) { }

  getAllProducts( {limit = 40, page = 1} : PaginationPara ): Observable<Response<Product>> {
    return this.http.get<Response<Product>>(`${environment.BaseURL}/products?limit=${limit}&page=${page}`);
  }
  
  getSpecificProduct(productId: string): Observable<{data: Product}> {
    return this.http.get<{ data: Product }>(`${environment.BaseURL}/products/${productId}`);
  }
}