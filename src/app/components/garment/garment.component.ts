import { Component, Input, inject } from '@angular/core';
import { GarmentOld } from './garment'
import { DateUtilsService } from '../../servises/date-utils.service';

@Component({
    selector: 'app-garment',
    templateUrl: './garment.component.html',
    styleUrls: ['./garment.component.scss'],
    standalone: false
})
export class GarmentComponent {
  @Input() garment!: GarmentOld;
  garmentService = inject(DateUtilsService);

  constructor(){
    //create a daysAgo=calculateDaysSinceLastWorn() field??
  }

  calculateDaysSinceLastWorn(lastWornDate: Date): number {
    return this.garmentService.calculateDaysSinceLastWorn(lastWornDate);
  }
}
