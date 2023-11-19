import { Component } from '@angular/core';
import { Garment } from 'src/app/components/garment/garment';

@Component({
  selector: 'app-outfit-creator',
  templateUrl: './outfit-creator.component.html',
  styleUrls: ['./outfit-creator.component.scss']
})
export class OutfitCreatorComponent {
  outfit: Garment[] = [];
  wardrobe: Garment[] = [];

  constructor (){}

  
}
