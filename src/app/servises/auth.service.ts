import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserCreate, UserResponse, UserLoginEmailPass } from '../models/user';
import { Token } from '../models/token';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  apiUrl: string;

  constructor() {
    this.apiUrl = "http://127.0.0.1:8000/"
  }

  postUser(user: UserCreate): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiUrl + "users/", user)
  }

  authWithEmailPass(credentials: UserLoginEmailPass): Observable<Token> {
    const formData = new URLSearchParams();

    formData.append('grant_type', 'password');
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<Token>(
      this.apiUrl + "auth/email",
      formData.toString(),
      { headers }
    )
  }

}
