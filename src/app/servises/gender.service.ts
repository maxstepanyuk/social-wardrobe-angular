import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenderResponse } from '../models/gender';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  http = inject(HttpClient);
  apiUrl: string;

  constructor() {
    this.apiUrl = "http://127.0.0.1:8000/genders/"
  }

  getAllGendersObservable(): Observable<Array<GenderResponse>> {
    return this.http.get<Array<GenderResponse>>(this.apiUrl);
  }

  getGenderByIdObservable(id: number): Observable<GenderResponse> {
    return this.http.get<GenderResponse>(this.apiUrl + id);
  }

}
