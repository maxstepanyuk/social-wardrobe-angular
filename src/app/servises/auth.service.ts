import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserCreate, UserResponse } from '../models/user';
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
}
