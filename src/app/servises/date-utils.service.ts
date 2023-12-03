import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService {

  constructor() { }
  
  static calculateDaysSinceLastWorn(lastWornDate: Date): number {
    const today = new Date();
    const timeDifference = today.getTime() - lastWornDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  }
}
