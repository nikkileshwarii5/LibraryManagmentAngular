import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/subscription-plans';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {

  constructor(private http: HttpClient) {}

  getAllPlans(): Observable<any> {
    return this.http.get(`${API_URL}/admin/all?page=0&size=100`);
  }

  createPlan(data: any): Observable<any> {
    return this.http.post(`${API_URL}/admin/create`, data);
  }

  updatePlan(id: number, data: any): Observable<any> {
    return this.http.put(`${API_URL}/admin/${id}`, data);
  }

  deletePlan(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/admin/${id}`);
  }





}