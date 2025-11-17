import { Component, Input, inject } from '@angular/core';
import { Outfit } from '../../models/outfit';
import { DateUtilsService } from '../../servises/date-utils.service';

@Component({
    selector: 'app-outfit',
    templateUrl: './outfit.component.html',
    styleUrls: ['./outfit.component.scss'],
    standalone: false
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
