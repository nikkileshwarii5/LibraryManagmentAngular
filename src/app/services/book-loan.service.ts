import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BookLoanStatistics } from '../models/book-loan-statistics';

@Injectable({
  providedIn: 'root'
})
export class BookLoanService {

  API ='http://15.206.209.161:8080/api/book-loans';

  constructor(
    private http: HttpClient
  ) {}

  private getHeaders() {

    const token =
      localStorage.getItem('jwt');

    return {

      headers: new HttpHeaders({

        Authorization:
          `Bearer ${token}`

      })

    };

  }

  getAllLoans(body: any) {

    return this.http.post(
      `${this.API}/search`,
      body,
      this.getHeaders()
    );

  }

  checkin(body: any) {

    return this.http.post(
      `${this.API}/checkin`,
      body,
      this.getHeaders()
    );

  }

  renew(body: any) {

    return this.http.post(
      `${this.API}/renew`,
      body,
      this.getHeaders()
    );

  }

  updateLoan(id: number, body: any) {

    return this.http.put(
      `${this.API}/${id}`,
      body,
      this.getHeaders()
    );

  }

  createFine(body: any) {

    return this.http.post(
      `http://15.206.209.161:8080/api/fines`,
      body,
      this.getHeaders()
    );

  }

  fetchMyBookLoans(
    status: string | null = null,
    page: number = 0,
    size: number = 20
  ) {

    let url =
      `${this.API}/my?page=${page}&size=${size}`;

    if (status) {

      url += `&status=${status}`;

    }

    return this.http.get(
      url,
      this.getHeaders()
    );

  }

  fetchDashboardStats() {

    return this.http.get(
      'http://15.206.209.161:8080/api/dashboard/my-dashboard-stats',
      this.getHeaders()
    );

  }

checkoutBook(request: any) {
  return this.http.post(
    `${this.API}/checkout`,
    request,
    this.getHeaders()
  );
}


getBookActivity(bookId: number) {
  return this.http.get<BookLoanStatistics>(
    `${this.API}/books/${bookId}/activity`
  );
}


requestReturn(body: any) {

  return this.http.post(

    `${this.API}/request-return`,

    body,

    this.getHeaders()

  );

}


approveReturn(body:any){

return this.http.post(

`${this.API}/approve-return`,

body,

this.getHeaders()

);

}



reportLost(body: any) {

  return this.http.post(
    `${this.API}/report-lost`,
    body,
    this.getHeaders()
  );

}

}
