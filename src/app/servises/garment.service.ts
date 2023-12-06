import { Injectable } from '@angular/core';
import { Garment } from './../components/garment/garment'

@Injectable({
  providedIn: 'root'
})
export class GarmentService {

  constructor() { }

  getAllGarments(): Garment[] {
    return this.garmentList;
  }

  getGarmentById(id: number): Garment | undefined {
    return this.garmentList.find(garment => garment.id === id)
  }

  getGarmentsByIds(ids: number[]): Garment[] {
    return this.garmentList.filter(garment => ids.includes(garment.id));
  }

  getAllGarmentsExceptIds(ids: number[]): Garment[] {
    return this.garmentList.filter(garment => !ids.includes(garment.id));
  }  

  protected garmentList: Garment[] = [
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
      id: 3,
      name: "Black Jacket",
      img: "https://picsum.photos/200/300?image=1029",
      type: "Jacket",
      date: new Date("2023-10-06"),
    },
    {
      id: 4,
      name: "Green Dress",
      img: "https://picsum.photos/200/300?image=1031",
      type: "Dress",
      date: new Date("2023-10-07"),
    },
    {
      id: 5,
      name: "White Sneakers",
      img: "https://picsum.photos/200/300?image=1000",
      type: "Shoes",
      date: new Date("2023-10-08"),
    },
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
      id: 8,
      name: "Black Jacket",
      img: "https://picsum.photos/200/300?image=1001",
      type: "Jacket",
      date: new Date("2023-10-11"),
    },
    {
      id: 9,
      name: "Green Dress",
      img: "https://picsum.photos/200/300?image=1035",
      type: "Dress",
      date: new Date("2023-10-12"),
    },
    {
      id: 10,
      name: "White Sneakers",
      img: "https://picsum.photos/200/300?image=1036",
      type: "Shoes",
      date: new Date("2023-10-13"),
    },
    {
      id: 11,
      name: "Red Shirt",
      img: "https://picsum.photos/200/300?image=1037",
      type: "Top",
      date: new Date("2023-10-14"),
    },
    {
      id: 12,
      name: "Blue Jeans",
      img: "https://picsum.photos/200/300?image=1038",
      type: "Bottom",
      date: new Date("2023-10-15"),
    },
    {
      id: 13,
      name: "Black Jacket",
      img: "https://picsum.photos/200/300?image=1039",
      type: "Jacket",
      date: new Date("2023-10-16"),
    },
    {
      id: 14,
      name: "Green Dress",
      img: "https://picsum.photos/200/300?image=1040",
      type: "Dress",
      date: new Date("2023-10-17"),
    },
    {
      id: 15,
      name: "White Sneakers",
      img: "https://picsum.photos/200/300?image=1041",
      type: "Shoes",
      date: new Date("2023-10-18"),
    },
  ];
}
