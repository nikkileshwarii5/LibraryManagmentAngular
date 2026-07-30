import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  API_URL = 'http://15.206.209.161:8080/api/notifications';

  constructor(private http: HttpClient) {}

  getHeaders() {

    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  fetchUnreadCount(): Observable<number> {

    return this.http
      .get<any>(
        `${this.API_URL}/count`,
        this.getHeaders()
      )
      .pipe(
        map(response => response.unreadCount)
      );
  }

  markNotificationAsRead(notificationId: number) {

  return this.http.put(
    `${this.API_URL}/${notificationId}/read`,
    {},
    this.getHeaders()
  );
}

deleteNotification(notificationId: number) {

  return this.http.delete(
    `${this.API_URL}/${notificationId}`,
    this.getHeaders()
  );
}
deleteAllNotifications(): Observable<any> {

    return this.http.delete(
      `${this.API_URL}/all`,
      this.getHeaders()
    );
  }

  registerPushToken(
    token: string,
    platform: string = 'WEB'
  ): Observable<any> {

    return this.http.post(
      `${this.API_URL}/push-token`,
      {
        token,
        platform
      },
      this.getHeaders()
    );
  }

  deletePushToken(
    token: string
  ): Observable<any> {

    return this.http.request(
      'delete',
      `${this.API_URL}/push-token`,
      {
        body: { token },
        headers:
          this.getHeaders().headers
      }
    );
  }

  fetchNotifications(params: any): Observable<any> {

  let httpParams = new HttpParams();

  Object.keys(params).forEach(key => {

    httpParams = httpParams.set(
      key,
      params[key]
    );

  });

  return this.http.get(
    this.API_URL,
    {
      params: httpParams,
      ...this.getHeaders()
    }
  );
}

markAllNotificationsAsRead(): Observable<any> {

  return this.http.put(
    `${this.API_URL}/read-all`,
    {},
    this.getHeaders()
  );
}


fetchNotificationStats() {

  return this.http.get<any>(
    `${this.API_URL}/stats`,
    this.getHeaders()
  );

}

}
