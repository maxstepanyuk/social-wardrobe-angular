import { Component, inject } from '@angular/core';
import { Outfit } from 'src/app/models/outfit';
import { OutfitService } from '../../servises/outfit.service';


@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
    standalone: false
})
export class FeedComponent {
  outfitList: Outfit[] = [];
  outfitService: OutfitService = inject(OutfitService)

  constructor(){
    this.outfitList = this.outfitService.getAllOutfits();
  }
}
