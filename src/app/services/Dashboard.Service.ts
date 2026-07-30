import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStats } from '../models/DashboardStats';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://15.206.209.161:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  // getStats(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/stats`);
  // }

  getStats(): Observable<any> {
  const token = localStorage.getItem('jwt');

  return this.http.get(`${this.apiUrl}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

}

fetchRecommendations(): Observable<any> {

  const token = localStorage.getItem('jwt');

  return this.http.get(`${this.apiUrl}/recommendations`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

}

getHeroStats() {
  return this.http.get<any>(`${this.apiUrl}/hero-stats`);
}


  getHomeStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/home-stats`);
  }

}
