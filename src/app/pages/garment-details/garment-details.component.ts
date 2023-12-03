import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarmentService } from '../../servises/garment.service';
import { Garment } from '../../components/garment/garment';
import { OutfitService } from 'src/app/servises/outfit.service';
import { Outfit } from 'src/app/components/outfit/outfit';

@Component({
  selector: 'app-garment-details',
  templateUrl: './garment-details.component.html',
  styleUrls: ['./garment-details.component.scss']
})
export class GarmentDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  garmentService = inject(GarmentService);
  garment: Garment | undefined;  

  outfitList: Outfit[] = [];
  outfitService: OutfitService = inject(OutfitService)

  constructor() {
    const garmentId = Number(this.route.snapshot.params['id']);
    this.garment = this.garmentService.getGarmentById(garmentId);
    this.outfitList = this.outfitService.getOutfitsWithGarment(garmentId);
  }
}
