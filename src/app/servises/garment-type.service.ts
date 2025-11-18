import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GarmentTypeResponse } from '../models/garment-type';

@Injectable({
  providedIn: 'root'
})
export class GarmentTypeService {
  http = inject(HttpClient);
  apiUrl: string;

  constructor() {
    this.apiUrl = "http://127.0.0.1:8000/garment-types/"
  }

  getAllGarmentTypesObservable(): Observable<Array<GarmentTypeResponse>> {
    return this.http.get<Array<GarmentTypeResponse>>(this.apiUrl);
  }

  getGarmentTypeByIdObservable(id: number): Observable<GarmentTypeResponse> {
    return this.http.get<GarmentTypeResponse>(this.apiUrl + id);
  }
}
