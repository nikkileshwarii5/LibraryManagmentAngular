import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://15.206.209.161:8080/api/reservations';

@Injectable({ providedIn: 'root' })
export class ReservationService {

  constructor(private http: HttpClient) {}

  private headers() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }

  searchReservations(paramsObj: any) {
    let params = new HttpParams()
      .set('page', paramsObj.page)
      .set('size', paramsObj.size)
      .set('sortBy', 'reservedAt')
      .set('sortDirection', 'DESC');

    if (paramsObj.userId) params = params.set('userId', paramsObj.userId);
    if (paramsObj.bookId) params = params.set('bookId', paramsObj.bookId);
    if (paramsObj.status) params = params.set('status', paramsObj.status);
    if (paramsObj.activeOnly !== undefined)
      params = params.set('activeOnly', paramsObj.activeOnly);

    return this.http.get<any>(API_URL, { headers: this.headers(), params });
  }

  fulfillReservation(id: number) {
    return this.http.post(`${API_URL}/${id}/fulfill`, {}, { headers: this.headers() });
  }

  cancelReservation(id: number) {
    return this.http.delete(`${API_URL}/${id}`, { headers: this.headers() });
  }

createReservation(request: any) {

  return this.http.post(
    API_URL,
    request,
    {
      headers: this.headers()
    }
  );

}

getMyReservations() {

  return this.http.get(
    `${API_URL}/my`,
    {
      headers: this.headers()
    }
  );

}
}
