import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl =
    'http://15.206.209.161:8080/api/reviews';

  constructor(
    private http: HttpClient
  ) {}

  private getHeaders() {

    const token =
      localStorage.getItem('jwt');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  checkCanReview(bookId: number): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/can-review/${bookId}`,
      this.getHeaders()
    );

  }

  getReviews(bookId: number): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/book/${bookId}`,
      this.getHeaders()
    );

  }

  createReview(reviewData: any): Observable<any> {

    return this.http.post(
      this.apiUrl,
      reviewData,
      this.getHeaders()
    );

  }

  updateReview(
    reviewId: number,
    reviewData: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${reviewId}`,
      reviewData,
      this.getHeaders()
    );

  }

  deleteReview(
    reviewId: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${reviewId}`,
      this.getHeaders()
    );

  }

  getMyReviews(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/my-reviews`,
      this.getHeaders()
    );

  }

  getRatingStatistics(
    bookId: number
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/book/${bookId}/statistics`,
      this.getHeaders()
    );

  }


  
}
