import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const API = 'http://15.206.209.161:8080/api/subscriptions';

@Injectable({ providedIn: 'root' })
export class SubscriptionPlanService {

  constructor(private http: HttpClient) {}

fetchAllActiveSubscriptions(page: number, size: number) {
  let params = new HttpParams()
    .set('page', page)
    .set('size', size);

  return this.http.get(`${API}/admin/active`, { params });
}

  renewSubscription(subscriptionId: number, body: any) {
    return this.http.post(`${API}/renew/${subscriptionId}`, body);
  }

  cancelSubscription(subscriptionId: number, reason: string) {
    return this.http.post(`${API}/cancel/${subscriptionId}?reason=${reason}`, {});
  }

  
getActiveSubscription() {

  const token =
    localStorage.getItem('token');

  return this.http.get(
    `${API}/user/active`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

}


checkValidSubscription(userId: number) {

  const token = localStorage.getItem('token');

  return this.http.get(
    `${API}/check?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

}

}
