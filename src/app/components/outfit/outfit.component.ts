import { Component, Input } from '@angular/core';
import { Outfit } from './outfit';

@Component({
  selector: 'app-outfit',
  templateUrl: './outfit.component.html',
  styleUrls: ['./outfit.component.scss']
})
export class OutfitComponent {
  // @Input() outfit!: Outfit;
  outfit: Outfit = { //use input later
    id: 1,
    name: "Casual Chic",
    img: "https://picsum.photos/200/300?image=1042",
    type: "Casual",
    date: new Date("2023-10-04"),
    garments: [
      {
        id: 1,
        name: "Red Shirt",
        img: "https://picsum.photos/200/300?image=1027",
        type: "Top",
        date: new Date("2023-10-04"),
      },
      {
        id: 2,
        name: "Blue Jeans",
        img: "https://picsum.photos/200/300?image=1028",
        type: "Bottom",
        date: new Date("2023-10-05"),
      },
      {
        id: 5,
        name: "White Sneakers",
        img: "https://picsum.photos/200/300?image=1000",
        type: "Shoes",
        date: new Date("2023-10-08"),
      },
    ],
  };
}
