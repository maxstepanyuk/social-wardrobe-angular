import { Component, Input } from '@angular/core';
import { Garment } from './garment'

@Component({
  selector: 'app-garment',
  templateUrl: './garment.component.html',
  styleUrls: ['./garment.component.scss']
})
export class GarmentComponent {
  @Input() garment!: Garment;
}
