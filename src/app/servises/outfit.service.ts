import { Injectable } from '@angular/core';
import { Outfit } from '../components/outfit/outfit';

@Injectable({
  providedIn: 'root'
})
export class OutfitService {

  constructor() { }

  getAllOutfits(): Outfit[] {
    return this.outfitList;
  }

  getOutfitById(id: number): Outfit | undefined {
    return this.outfitList.find(outfit => outfit.id === id);
  }

  getOutfitsByIds(ids: number[]): Outfit[] {
    return this.outfitList.filter(outfit => ids.includes(outfit.id));
  }

  protected outfitList: Outfit[] = [
    {
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
    },
    {
      id: 2,
      name: "Edgy Night Out",
      img: "https://picsum.photos/200/300?image=1043",
      type: "Night Out",
      date: new Date("2023-10-06"),
      garments: [
        {
          id: 3,
          name: "Black Jacket",
          img: "https://picsum.photos/200/300?image=1001",
          type: "Jacket",
          date: new Date("2023-10-06"),
        },
        {
          id: 9,
          name: "Green Dress",
          img: "https://picsum.photos/200/300?image=1035",
          type: "Dress",
          date: new Date("2023-10-12"),
        },
        {
          id: 15,
          name: "White Sneakers",
          img: "https://picsum.photos/200/300?image=1041",
          type: "Shoes",
          date: new Date("2023-10-13"),
        },
      ],
    },
    {
      id: 3,
      name: "Comfy Weekend",
      img: "https://picsum.photos/200/300?image=1044",
      type: "Weekend",
      date: new Date("2023-10-09"),
      garments: [
        {
          id: 6,
          name: "Red Shirt",
          img: "https://picsum.photos/200/300?image=1032",
          type: "Top",
          date: new Date("2023-10-09"),
        },
        {
          id: 7,
          name: "Blue Jeans",
          img: "https://picsum.photos/200/300?image=1033",
          type: "Bottom",
          date: new Date("2023-10-10"),
        },
        {
          id: 10,
          name: "White Sneakers",
          img: "https://picsum.photos/200/300?image=1036",
          type: "Shoes",
          date: new Date("2023-10-13"),
        },
      ],
    },
  ];
}
