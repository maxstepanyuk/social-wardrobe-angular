import { Component, Input, inject } from '@angular/core';
import { OutfitOld } from '../../models/outfit';
import { DateUtilsService } from '../../servises/date-utils.service';

@Component({
    selector: 'app-outfit',
    templateUrl: './outfit.component.html',
    styleUrls: ['./outfit.component.scss'],
    standalone: false
})
export class OutfitComponent {
  dateUtilsService = inject(DateUtilsService);
  @Input() outfit!: OutfitOld;

  constructor() {
    //create a daysAgo=calculateDaysSinceLastWorn() field??
  }

  calculateDaysSinceLastWorn(lastWornDate: Date): number {
    return this.dateUtilsService.calculateDaysSinceLastWorn(lastWornDate);
  }
}
