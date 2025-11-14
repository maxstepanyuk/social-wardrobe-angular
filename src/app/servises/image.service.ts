import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ImageInfoResponse } from '../models/image';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  http = inject(HttpClient);
  apiUrl: string;

  constructor() {
    this.apiUrl = "http://127.0.0.1:8000/images/";
  }

  uploadImage(file: File): Observable<ImageInfoResponse> {
    console.log(file);
    const formData = new FormData();
    formData.append('file_in', file);
    return this.http.post<ImageInfoResponse>(this.apiUrl, formData);
  }

  getImageLink(filename: string): string {
    return this.apiUrl + filename;
  }

  // todo add when using auth
  // getImageBlob(){}

  getImageInfo(filename: string): Observable<ImageInfoResponse> {
    return this.http.get<ImageInfoResponse>(this.apiUrl + filename + "/info");
  }

  deleteImage(filename: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + filename);
  }
}