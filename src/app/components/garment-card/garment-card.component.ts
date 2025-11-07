import { Component, inject, Input } from '@angular/core';
import { GarmentResponse } from 'src/app/models/garment';
import { DateUtilsService } from 'src/app/servises/date-utils.service';

@Component({
  selector: 'app-garment-card',
  standalone: false,
  templateUrl: './garment-card.component.html',
  styleUrl: './garment-card.component.scss',
})
export class GarmentCardComponent {
  @Input() garment!: GarmentResponse;
  dateUtilsService = inject(DateUtilsService);

  constructor() { }
}
