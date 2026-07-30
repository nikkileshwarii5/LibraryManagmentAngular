import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'http://15.206.209.161:8080/api/payments';

@Injectable({ providedIn: 'root' })
export class PaymentService {

  constructor(private http: HttpClient) {}

  // ✅ GET ALL PAYMENTS
  getAllPayments(page: number, size: number) {
    return this.http.get(`${API}?page=${page}&size=${size}`);
  }

  // ✅ GET PAYMENT BY ID
  getPaymentById(id: number) {
    return this.http.get(`${API}/${id}`);
  }

  // ✅ CANCEL PAYMENT
  cancelPayment(id: number) {
    return this.http.put(`${API}/${id}/cancel`, {});
  }

  // ✅ RETRY PAYMENT
  retryPayment(id: number) {
    return this.http.post(`${API}/${id}/retry`, {});
  }

  // ✅ MONTHLY REVENUE
  getMonthlyRevenue() {
    return this.http.get(`${API}/statistics/monthly-revenue`);
  }


  // ✅ INITIATE PAYMENT

initiatePayment(data: any) {

  return this.http.post(

    `${API}/initiate`,

    data

  );

}

// ✅ VERIFY PAYMENT

verifyPayment(data: any) {

  return this.http.post(

    `${API}/verify`,

    data

  );

}

}
