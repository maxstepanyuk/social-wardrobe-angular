import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryMasterResponse, CategorySubResponse } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient);
  apiUrl: string;

  constructor() {
    this.apiUrl = "http://127.0.0.1:8000/categories/"
  }

  getAllMasterCategoriesObservable(): Observable<Array<CategoryMasterResponse>> {
    return this.http.get<Array<CategoryMasterResponse>>(this.apiUrl + 'master/');
  }

  getMasterCategoryByIdObservable(id: number): Observable<CategoryMasterResponse> {
    return this.http.get<CategoryMasterResponse>(this.apiUrl + 'master/' + id);
  }

  getAllSubCategoriesObservable(): Observable<Array<CategorySubResponse>> {
    return this.http.get<Array<CategorySubResponse>>(this.apiUrl + 'sub/');
  }

  getSubCategoryByIdObservable(id: number): Observable<CategorySubResponse> {
    return this.http.get<CategorySubResponse>(this.apiUrl + 'sub/' + id);
  }

}
