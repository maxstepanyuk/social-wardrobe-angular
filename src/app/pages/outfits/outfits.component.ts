import { Component, inject } from '@angular/core';
import { Outfit } from 'src/app/components/outfit/outfit';
import { OutfitService } from '../../servises/outfit.service';

@Component({
  selector: 'app-outfits',
  templateUrl: './outfits.component.html',
  styleUrls: ['./outfits.component.scss']
})
export class OutfitsComponent {
  outfitList: Outfit[] = [];
  outfitService: OutfitService = inject(OutfitService)

  constructor(){
    this.outfitList = this.outfitService.getAllOutfits();
  }
}
