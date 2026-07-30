import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookService {
  private API = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  // ✅ COMMON HEADER METHOD
 private getHeaders() {
  const token = localStorage.getItem('jwt'); // use jwt consistently
  return new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  }

  getBooks(paramsData: any) {
    let params = new HttpParams();

    Object.keys(paramsData).forEach(key => {
      if (paramsData[key] !== null && paramsData[key] !== '') {
        params = params.set(key, paramsData[key]);
      }
    });

    return this.http.get<any>(this.API, {
      params,
      headers: this.getHeaders()   // ✅ added
    });
  }

  searchBooks(body: any) {
    return this.http.post<any>(`${this.API}/search`, body, {
      headers: this.getHeaders()   // ✅ added
    });
  }

  createBook(data: any) {
    return this.http.post(this.API, data, {
      headers: this.getHeaders()   // ✅ added
    });
  }

  updateBook(id: number, data: any) {
    return this.http.put(`${this.API}/${id}`, data, {
      headers: this.getHeaders()   // ✅ added
    });
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.API}/${id}`, {
      headers: this.getHeaders()   // ✅ added
    });
  }

  getBookById(id: number) {

  return this.http.get<any>(
    `${this.API}/${id}`,
    {
      headers: this.getHeaders()
    }
  );

}
}