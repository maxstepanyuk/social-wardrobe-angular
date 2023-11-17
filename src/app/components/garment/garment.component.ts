import { Component, Input } from '@angular/core';
import { Garment } from './garment'

@Component({
  selector: 'app-garment',
  templateUrl: './garment.component.html',
  styleUrls: ['./garment.component.scss']
})
export class GarmentComponent {
  @Input() garment!: Garment;
  
  calculateDaysSinceLastWorn(lastWornDate: Date): number {
    const today = new Date();
    const timeDifference = today.getTime() - lastWornDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  }
}
