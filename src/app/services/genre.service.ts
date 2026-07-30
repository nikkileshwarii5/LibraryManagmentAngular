import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GenreService {

  private API = 'http://15.206.209.161:8080/api/genres';

  constructor(private http: HttpClient) {}

  // 🔥 COMMON HEADERS
  private headers() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`   // ✅ keep your existing key
    });
  }

  // 🔥 GET ALL ACTIVE GENRES (existing + renamed)
  getGenres() {
    return this.http.get<any[]>(`${this.API}/active`, {
      headers: this.headers()
    });
  }

  // 🔥 SAME as above but cleaner naming (optional)
  fetchActiveGenres() {
    return this.getGenres();
  }

  // 🔥 CREATE
  createGenre(data: any) {
    return this.http.post(this.API, data, {
      headers: this.headers()
    });
  }

  // 🔥 UPDATE
  updateGenre(id: number, data: any) {
    return this.http.put(`${this.API}/${id}`, data, {
      headers: this.headers()
    });
  }

  // 🔥 DELETE
  deleteGenre(id: number) {
    return this.http.delete(`${this.API}/${id}`, {
      headers: this.headers()
    });
  }

  // 🔥 SEARCH
  searchGenres(paramsObj: any) {
    let params = new HttpParams()
      .set('term', paramsObj.term)
      .set('page', paramsObj.page)
      .set('size', paramsObj.size)
      .set('sortBy', paramsObj.sortBy)
      .set('sortDir', paramsObj.sortDir);

    return this.http.get<any>(`${this.API}/search`, {
      headers: this.headers(),
      params
    });
  }
}
