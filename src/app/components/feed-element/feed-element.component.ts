import { Component, Input } from '@angular/core';
import { Outfit } from '../outfit/outfit';
import { Garment } from '../garment/garment';

enum PostTypes {
  Other = 1,
  Outfit,
  Garment,
}

@Component({
  selector: 'app-feed-element',
  templateUrl: './feed-element.component.html',
  styleUrls: ['./feed-element.component.scss']
})
export class FeedElementComponent {

    
  // @Input() post!: Outfit | Garment;
  @Input() post!: Outfit;


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
