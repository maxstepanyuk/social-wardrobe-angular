import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsageResponse } from '../models/usage';

@Injectable({
  providedIn: 'root'
})
export class UsageService {
  http = inject(HttpClient);
  apiUrl: string;

  constructor() {
    this.apiUrl = "http://127.0.0.1:8000/uses/"
  }

    getAllUsesObservable(): Observable<Array<UsageResponse>> {
      return this.http.get<Array<UsageResponse>>(this.apiUrl);
    }
  
    getUsageByIdObservable(id: number): Observable<UsageResponse> {
      return this.http.get<UsageResponse>(this.apiUrl + id);
    }
}
