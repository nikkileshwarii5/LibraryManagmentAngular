import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://15.206.209.161:8080/api/fines';

@Injectable({
  providedIn: 'root'
})
export class FineService {

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }

  getAllFines(paramsObj: any): Observable<any> {
    let params = new HttpParams()
      .set('page', paramsObj.page)
      .set('size', paramsObj.size);

    if (paramsObj.status) params = params.set('status', paramsObj.status);
    if (paramsObj.type) params = params.set('type', paramsObj.type);
    if (paramsObj.userId) params = params.set('userId', paramsObj.userId);

    return this.http.get(`${API_URL}`, { headers: this.getHeaders(), params });
  }

  getTotalCollected() {
    return this.http.get<any>(`${API_URL}/statistics/collected`, { headers: this.getHeaders() });
  }

  getTotalOutstanding() {
    return this.http.get<any>(`${API_URL}/statistics/outstanding`, { headers: this.getHeaders() });
  }

  payFine(fineId: number, transactionId?: string) {
    const url = transactionId
      ? `${API_URL}/${fineId}/pay?transactionId=${transactionId}`
      : `${API_URL}/${fineId}/pay`;

    return this.http.post<any>(url, {}, { headers: this.getHeaders() });
  }

  waiveFine(data: any) {
    return this.http.post(`${API_URL}/waive`, data, { headers: this.getHeaders() });
  }

  deleteFine(fineId: number) {
    return this.http.delete(`${API_URL}/${fineId}`, { headers: this.getHeaders() });
  }


  getMyFines(status?: string, type?: string): Observable<any> {

  let params = new HttpParams();

  if (status) {
    params = params.set('status', status);
  }

  if (type) {
    params = params.set('type', type);
  }

  return this.http.get(
    `${API_URL}/my`,
    {
      headers: this.getHeaders(),
      params
    }
  );
}
}
