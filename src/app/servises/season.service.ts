import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeasonResponse } from '../models/season';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {
  http = inject(HttpClient);
  apiUrl: string;

  constructor() {
    this.apiUrl = "http://127.0.0.1:8000/seasons/"
  }

  getAllSeasonsObservable(): Observable<Array<SeasonResponse>> {
    return this.http.get<Array<SeasonResponse>>(this.apiUrl);
  }

  getSeasonByIdObservable(id: number): Observable<SeasonResponse> {
    return this.http.get<SeasonResponse>(this.apiUrl + id);
  }

}
