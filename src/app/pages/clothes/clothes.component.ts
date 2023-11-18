import { Component } from '@angular/core';
// import { Garment } from 'src/app/components/garment/garment';
import { Garment } from '../../components/garment/garment';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss']
})
export class ClothesComponent {
  garmentList: Garment[] = [];
}
