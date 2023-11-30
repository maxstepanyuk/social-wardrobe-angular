import { Component, inject } from '@angular/core';
import { Garment } from 'src/app/components/garment/garment';
import { GarmentService } from '../../servises/garment.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-outfit-creator',
  templateUrl: './outfit-creator.component.html',
  styleUrls: ['./outfit-creator.component.scss'],
})
export class OutfitCreatorComponent {
  outfit: Garment[] = [];
  wardrobe: Garment[] = [];
  garmentService: GarmentService = inject(GarmentService);

  constructor() {
    this.wardrobe = this.garmentService.getAllGarments();
  }

  drop(event: CdkDragDrop<Garment[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      return;
      // } else if (!event.container.data || !event.previousContainer.data) {
      //   return;
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
