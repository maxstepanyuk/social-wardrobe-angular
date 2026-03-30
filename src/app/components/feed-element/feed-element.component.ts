import { Component, Input } from '@angular/core';
import { OutfitOld } from '../../models/outfit';
import { GarmentOld } from '../../models/garment';

enum PostTypes {
  Other = 1,
  Outfit,
  Garment,
}

/**
 * @deprecated 
 */
@Component({
    selector: 'app-feed-element',
    templateUrl: './feed-element.component.html',
    styleUrls: ['./feed-element.component.scss'],
    standalone: false
})
export class FeedElementComponent {

    
  // @Input() post!: Outfit | Garment;
  @Input() post!: OutfitOld;


  // //TODO - DE
  // postTypes = PostTypes;

  // //TOD - check??
  // postType = PostTypes.Outfit;

  username: string;
  subtitle: string;
  
  constructor() {
    //TODO - get from @Input, use interface
    this.username = "user1";
    this.subtitle = "added";

    // if (PostTypes.Garment === this.postType) {
    //   this.subtitle += " garmant.";
    // } else if (PostTypes.Outfit === this.postType) {
    //   this.subtitle += " outfit.";
    // }


  }

}
