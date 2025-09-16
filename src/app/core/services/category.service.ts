import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Response,  } from '../interfaces/api.interface';
import { environment } from '../../../environments/environment.development';

interface PaginationPara {
  limit?: number;
  page?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
    constructor(private http:HttpClient) { }
  
    getAllCategory( {limit = 40, page = 1} : PaginationPara ): Observable<Response<Category>> {
      return this.http.get<Response<Category>>(
        `${environment.BaseURL}/categories?limit=${limit}&page=${page}`,
      );
    }
    
    getSpecificCategory(productId: string): Observable<{data: Category}> {
      return this.http.get<{ data: Category }>(`${environment.BaseURL}/categories/${productId}`);
    }
}
