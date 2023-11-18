import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarmentService } from '../../servises/garment.service';
import { Garment } from '../../components/garment/garment';

@Component({
  selector: 'app-garment-details',
  templateUrl: './garment-details.component.html',
  styleUrls: ['./garment-details.component.scss']
})
export class GarmentDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  garmentService = inject(GarmentService);
  garment: Garment | undefined;  

  constructor() {
    const garmentId = Number(this.route.snapshot.params['id']);
    this.garment = this.garmentService.getGarmentById(garmentId);
  }
}
