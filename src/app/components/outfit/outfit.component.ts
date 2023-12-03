import { Component, Input, inject } from '@angular/core';
import { Outfit } from './outfit';
import { DateUtilsService } from '../../servises/date-utils.service';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss']
})
export class OutfitComponent {
  garmentService = inject(DateUtilsService);
  @Input() outfit!: Outfit;

  constructor() {
    //create a daysAgo=calculateDaysSinceLastWorn() field??
  }

  calculateDaysSinceLastWorn(lastWornDate: Date): number {
    return this.garmentService.calculateDaysSinceLastWorn(lastWornDate);
  }
}
