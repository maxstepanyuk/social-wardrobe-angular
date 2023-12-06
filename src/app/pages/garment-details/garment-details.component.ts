import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GarmentService } from '../../servises/garment.service';
import { Garment } from '../../components/garment/garment';
import { OutfitService } from 'src/app/servises/outfit.service';
import { Outfit } from 'src/app/components/outfit/outfit';

@Component({
  selector: 'app-garment-details',
  templateUrl: './garment-details.component.html',
  styleUrls: ['./garment-details.component.scss']
})
export class GarmentDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  garmentService = inject(GarmentService);
  garment: Garment | undefined;

  outfitList: Outfit[] = [];
  outfitService: OutfitService = inject(OutfitService)

  newGarment: Garment | undefined;
  newImage: string = "";
  newName: string = "";
  newDate: Date = new Date;
  // types: string[] = ['Type1', 'Type2', 'Type3']; // todo
  newType: string = "";

  constructor() {
    const garmentId = Number(this.route.snapshot.params['id']);
    this.garment = this.garmentService.getGarmentById(garmentId);
    this.outfitList = this.outfitService.getOutfitsWithGarment(garmentId);

    this.newName = this.garment?.name!;
    this.newImage = this.garment?.img!;
    this.newType = this.garment?.type!;
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.newImage = e.target?.result as string;
        // this.newGarment.img = (e.target?.result as string)!;
      };

      reader.readAsDataURL(file);
    }
  }

  saveGarment(): void {
    const updatedGarment: Garment = {
      ...this.garment!,
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
