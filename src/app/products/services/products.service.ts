import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ProductsResponse } from '../interfaces/product.interface';
import { environment } from '../../../environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({providedIn: 'root'})
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(options: Options): Observable<ProductsResponse>{
    const { limit = 9, offset = 0, gender = ''} = options;

    const params: Record<string, string | number> = { limit, offset };
    if (gender) params['gender'] = gender;

    return this.http.get<ProductsResponse>(`${baseUrl}/products`, { params }).pipe(tap((resp) => console.log(resp)));
  }

}
