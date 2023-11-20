import { Component, inject } from '@angular/core';
import { Garment } from 'src/app/components/garment/garment';
import { GarmentService } from '../../servises/garment.service';

@Component({
  selector: 'app-outfit-creator',
  templateUrl: './outfit-creator.component.html',
  styleUrls: ['./outfit-creator.component.scss']
})
export class OutfitCreatorComponent {
  outfitGarmentList: Garment[] = [];
  wardrobeGarmentList: Garment[] = [];
  garmentService: GarmentService = inject(GarmentService)

  constructor(){
    this.wardrobeGarmentList = this.garmentService.getAllGarments();
  }
}
