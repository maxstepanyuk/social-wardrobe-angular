import { Component, inject } from '@angular/core';
import { Garment } from 'src/app/components/garment/garment';
import { GarmentService } from '../../servises/garment.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-outfit-creator',
  templateUrl: './outfit-creator.component.html',
  styleUrls: ['./outfit-creator.component.scss'],
})
export class OutfitCreatorComponent {
  outfit: Garment[] = [
    // {
    //   id: 1,
    //   name: "Red Shirt",
    //   img: "https://picsum.photos/200/300?image=1027",
    //   type: "Top",
    //   date: new Date("2023-10-04"),
    // },
    // {
    //   id: 2,
    //   name: "Blue Jeans",
    //   img: "https://picsum.photos/200/300?image=1028",
    //   type: "Bottom",
    //   date: new Date("2023-10-05"),
    // },
  ];
  wardrobe: Garment[] = [];
  garmentService: GarmentService = inject(GarmentService);

  constructor() {
    this.wardrobe = this.garmentService.getAllGarments();
  }

  drop(event: CdkDragDrop<Garment[]>) {
    if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
