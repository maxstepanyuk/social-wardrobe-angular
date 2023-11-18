import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-garment-details',
  templateUrl: './garment-details.component.html',
  styleUrls: ['./garment-details.component.scss']
})
export class GarmentDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  garmentId = 0;

  constructor() {
    this.garmentId = Number(this.route.snapshot.params['id'])
  }
}
