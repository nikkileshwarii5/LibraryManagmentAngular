import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // ✅ LOGIN
  login(data: any): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${API_URL}/auth/login`, data).subscribe({
        next: (res: any) => {
          const { jwt, ...user } = res;

          localStorage.setItem('jwt', jwt);
          localStorage.setItem('token', jwt);
          localStorage.setItem('user',JSON.stringify(user));

          observer.next({ token: jwt, user });
          observer.complete();
        },
        error: (err) => {
          observer.error(err.error?.message || 'Login failed');
        }
      });
    });
  }

  // ✅ REGISTER
  signup(data: any): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${API_URL}/auth/signup`, data).subscribe({
        next: (res: any) => {
          const { jwt, ...user } = res;

          localStorage.setItem('jwt', jwt);
          localStorage.setItem('token', jwt);

          observer.next({ token: jwt, user });
          observer.complete();
        },
        error: (err) => {
          observer.error(err.error?.message || 'Signup failed');
        }
      });
    });
  }

  // ✅ FORGOT PASSWORD
  forgotPassword(email: string): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${API_URL}/auth/forgot-password`, { email }).subscribe({
        next: (res) => {
          observer.next(res);
          observer.complete();
        },
        error: (err) => {
          observer.error(err.error?.message || 'Failed to send reset link');
        }
      });
    });
  }

  // ✅ RESET PASSWORD
  resetPassword(token: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.http.post(`${API_URL}/auth/reset-password`, { token, password }).subscribe({
        next: (res) => {
          observer.next(res);
          observer.complete();
        },
        error: (err) => {
          observer.error(err.error?.message || 'Failed to reset password');
        }
      });
    });
  }

  // ✅ FETCH CURRENT USER
  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('jwt');

    return this.http.get(`${API_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}