import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../models/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API = 'http://15.206.209.161:8080';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    };
  }

  // ✅ GET USERS LIST
  // getUsersList() {
  //   return this.http.get<any[]>(`${this.API}/users/list`, {
  //     headers: this.getHeaders()
  //   });
  // }


  // ✅ GET USERS LIST (Pagination)
getUsersList(page: number, size: number) {
  return this.http.get<any>(
    `${this.API}/users/list`,
    {
      headers: this.getHeaders(),
      params: {
        page: page,
        size: size
      }
    }
  );
}

  // ✅ GET USER PROFILE
  // getProfile() {
  //   return this.http.get(`${this.API}/api/users/profile`, {
  //     headers: this.getHeaders()
  //   });
  // }

  getProfile() {
  return this.http.get<UserProfile>(
    `${this.API}/api/users/profile`,
    {
      headers: this.getHeaders()
    }
  );
}

  // ✅ GET USER BY ID
  getUserById(id: number) {
    return this.http.get(`${this.API}/users/${id}`, {
      headers: this.getHeaders()
    });
  }

  // 🔥 NEW: TOGGLE VERIFIED STATUS
  toggleUserStatus(id: number) {
    return this.http.patch(`${this.API}/users/${id}/toggle-status`, {}, {
      headers: this.getHeaders()
    });
  }

  // 🔥 NEW: MAKE USER ADMIN
  makeUserAdmin(id: number) {
    return this.http.patch(
      `${this.API}/users/${id}/role?role=ROLE_ADMIN`,
      {},
      { headers: this.getHeaders() }
    );
  }

  updateProfile(profileData: any) {
  return this.http.put(
    `${this.API}/api/users/profile`,
    profileData,
    {
      headers: this.getHeaders()
    }
  );
}
  
uploadProfileImage(
  image: string
) {

  return this.http.put(
    `${this.API}/api/users/profile/image`,
    {
      profileImage: image
    },
    {
      headers: this.getHeaders()
    }
  );

}


updateUserRole(id: number, role: string) {
  return this.http.patch(
    `${this.API}/users/${id}/role?role=${role}`,
    {}
  );
}

getAchievements() {

  return this.http.get<any[]>(
    'http://15.206.209.161:8080/api/achievements/my-achievements',
    {
      headers: this.getHeaders()
    }
  );

}

getAdminStatistics() {

  return this.http.get<any>(
    `${this.API}/api/admin/statistics`,
    {
      headers: this.getHeaders()
    }
  );

}
}
