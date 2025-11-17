import { Component, inject } from '@angular/core';
import { OutfitOld } from 'src/app/models/outfit';
import { OutfitService } from '../../servises/outfit.service';

@Component({
    selector: 'app-outfits',
    templateUrl: './outfits.component.html',
    styleUrls: ['./outfits.component.scss'],
    standalone: false
})
export class OutfitsComponent {
  outfitList: OutfitOld[] = [];
  outfitService: OutfitService = inject(OutfitService)

  constructor(){
    this.outfitList = this.outfitService.getAllOutfits();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
  }
}
