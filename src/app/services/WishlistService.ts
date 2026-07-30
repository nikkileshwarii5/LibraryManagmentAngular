import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';

const API = 'http://localhost:8080/api/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) {}

  private getHeaders() {

    const token =
      localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getMyWishlist(page: number, size: number) {

    const params = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.http.get(
      `${API}/my-wishlist`,
      {
        params,
        headers: this.getHeaders().headers
      }
    );
  }

  removeFromWishlist(bookId: number) {

    return this.http.delete(
      `${API}/remove/${bookId}`,
      {
        headers: this.getHeaders().headers
      }
    );
  }

  addToWishlist(bookId: number, notes?: string) {

    return this.http.post(
      `${API}/add/${bookId}`,
      {},
      {
        params: notes
          ? { notes }
          : {},
        headers: this.getHeaders().headers
      }
    );
  }

  getMyWishlistCount() {

    return this.http.get(
      `${API}/my-count`,
      {
        headers: this.getHeaders().headers
      }
    );
  }

}