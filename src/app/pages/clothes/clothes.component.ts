import { Component, inject } from '@angular/core';
// import { Garment } from 'src/app/components/garment/garment';
import { Garment } from '../../components/garment/garment';
import { GarmentService } from '../../servises/garment.service';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss']
})
export class ClothesComponent {
  garmentList: Garment[] = [];
  garmentService: GarmentService = inject(GarmentService)

  constructor(){
    this.garmentList = this.garmentService.getAllGarments();
  }
}
