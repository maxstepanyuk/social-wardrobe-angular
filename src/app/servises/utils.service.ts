import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  removeEmptyFields(obj: any): any {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const value = obj[key];
      if (value !== null && value !== undefined && value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});
  }
}
