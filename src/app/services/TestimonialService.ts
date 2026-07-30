import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })


export class TestimonialService {

  API = 'http://localhost:8080/testimonials';

  constructor(private http: HttpClient) {}

    // Home page - Approved testimonials only
  getApprovedTestimonials(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  // User submits testimonial
  add(data: any): Observable<any> {
    return this.http.post(this.API, data);
  }

  // Admin - Get all testimonials
  getAllTestimonials(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/admin`);
  }

  // Admin - Approve
  approve(id: number): Observable<any> {
    return this.http.put(`${this.API}/admin/${id}/approve`, {});
  }

  // Admin - Reject
  reject(id: number): Observable<any> {
    return this.http.put(`${this.API}/admin/${id}/reject`, {});
  }

  // Admin - Delete
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/admin/${id}`);
  }


  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }





}