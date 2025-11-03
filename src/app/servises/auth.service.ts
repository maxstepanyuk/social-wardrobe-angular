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

  private readonly ACCESS_TOKEN = 'access_token';
  private readonly TOKEN_TYPE_KEY = 'token_type';

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

  saveToken(token: Token) {
    console.log(token)
    localStorage.setItem(this.ACCESS_TOKEN, token.access_token);
    localStorage.setItem(this.TOKEN_TYPE_KEY, token.token_type);
  }

  deleteToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.TOKEN_TYPE_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }
  getTokenType(): string | null {
    return localStorage.getItem(this.TOKEN_TYPE_KEY);
  }

  getAuthorizationHeader(): string | null {
    const token = this.getToken();
    const tokenType = this.getTokenType();
    if (token && tokenType) {
      return `${tokenType} ${token}`;
    }
    return null;
  }

}
