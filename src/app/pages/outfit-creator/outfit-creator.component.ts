import { Component, inject } from '@angular/core';
import { Garment } from 'src/app/components/garment/garment';
import { GarmentService } from '../../servises/garment.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { Outfit } from 'src/app/components/outfit/outfit';
import { OutfitService } from 'src/app/servises/outfit.service';

@Component({
  selector: 'app-outfit-creator',
  templateUrl: './outfit-creator.component.html',
  styleUrls: ['./outfit-creator.component.scss'],
})
export class OutfitCreatorComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  outfitGarments: Garment[] = [];
  wardrobeGarments: Garment[] = [];
  garmentService: GarmentService = inject(GarmentService);
  outfitService: OutfitService = inject(OutfitService);

  outfit: Outfit | undefined;
  newImage: string | undefined;
  newName: string = "";
  newType: string = "";
  newDate: Date = new Date;
  
  //is this ok? i dont even know
  constructor() {
    const outfitId = Number(this.route.snapshot.params['id']);
    // console.log(outfitId);
    this.outfit = this.outfitService.getOutfitById(outfitId) as Outfit; // Type assertion
    // console.log(this.outfit);
    
    if (this.outfit === undefined) {
      this.outfitGarments = [];
      this.wardrobeGarments = this.garmentService.getAllGarments();
      
      this.newImage = undefined;
    } else {
      this.outfitGarments = this.outfit?.garments!;
      this.wardrobeGarments = this.garmentService.getAllGarmentsExceptIds(this.outfitGarments.map(garment => garment.id));

      this.newImage = this.outfit?.img!;
      this.newName = this.outfit?.name;
      this.newType = this.outfit?.type;
      this.newDate = this.outfit?.date;
    }
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.newImage = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
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

  saveOutfit(): void {
    const updatedGarment: Outfit = {
      ...this.outfit!,
      name: this.newName,
      img: this.newImage,
      date: this.newDate,
      type: this.newType,
    };

    // TODO: Send the updatedGarment object to the server, set the info to the fields or relode a page after saving
    // if no id - create
    // if there is id - update
    console.log('Updated garment object:', updatedGarment);
  }
}
//TODO get data from outfit if route /:id
