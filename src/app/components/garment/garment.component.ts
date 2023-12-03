import { Component, Input, inject } from '@angular/core';
import { Garment } from './garment'
import { DateUtilsService } from '../../servises/date-utils.service';

@Component({
  selector: 'app-garment',
  templateUrl: './garment.component.html',
  styleUrls: ['./garment.component.scss']
})
export class GarmentComponent {
  @Input() garment!: Garment;
  garmentService = inject(DateUtilsService);

  constructor(){
    //create a daysAgo=calculateDaysSinceLastWorn() field??
  }

  calculateDaysSinceLastWorn(lastWornDate: Date): number {
    return this.garmentService.calculateDaysSinceLastWorn(lastWornDate);
  }
}
