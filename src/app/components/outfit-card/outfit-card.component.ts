import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GarmentResponse } from 'src/app/models/garment';
import { OutfitResponse } from 'src/app/models/outfit';

@Component({
  selector: 'app-outfit-card',
  standalone: false,
  templateUrl: './outfit-card.component.html',
  styleUrl: './outfit-card.component.scss',
})
export class OutfitCardComponent {
  @Input() outfit!: OutfitResponse;
  @Input() garments!: GarmentResponse[];

  constructor() { }
}
