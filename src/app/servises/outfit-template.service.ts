import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GarmentTypeResponse } from '../models/garment-type';
import { OutfitTemplateParameterResponse, OutfitTemplateResponse } from '../models/outfit-template';

@Injectable({
  providedIn: 'root'
})
export class OutfitTemplateService {
  http = inject(HttpClient);
  apiUrl: string;

  constructor() {
    this.apiUrl = "http://127.0.0.1:8000/outfit-templates/"
  }

  getAllOutfitTemplatesObservable(): Observable<Array<OutfitTemplateResponse>> {
    return this.http.get<Array<OutfitTemplateResponse>>(this.apiUrl);
  }

  getAllOutfitTemplateParametersObservable(): Observable<Array<OutfitTemplateParameterResponse>> {
    return this.http.get<Array<OutfitTemplateParameterResponse>>(this.apiUrl + "parameters");
  }

  getOutfitTemplateByIdParametersObservable(id: number): Observable<Array<OutfitTemplateParameterResponse>> {
    return this.http.get<Array<OutfitTemplateParameterResponse>>(this.apiUrl + id + "/parameters");
  }

}
