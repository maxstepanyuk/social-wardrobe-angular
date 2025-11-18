import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorResponse } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  http = inject(HttpClient);
  apiUrl: string;

  constructor() {
    this.apiUrl = "http://127.0.0.1:8000/colors/"
  }

  getAllColorsObservable(): Observable<Array<ColorResponse>> {
    return this.http.get<Array<ColorResponse>>(this.apiUrl);
  }

  getColorByIdObservable(id: number): Observable<ColorResponse> {
    return this.http.get<ColorResponse>(this.apiUrl + id);
  }

}
