import { Component, inject, OnInit } from '@angular/core';
import { OutfitResponse } from 'src/app/models/outfit';
import { OutfitService } from '../../servises/outfit.service';
import { ImageService } from 'src/app/servises/image.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GarmentResponse } from 'src/app/models/garment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-outfits',
  templateUrl: './outfits.component.html',
  styleUrls: ['./outfits.component.scss'],
  standalone: false
})
export class OutfitsComponent implements OnInit {

  outfitList: OutfitResponse[] = [];
  outfitGarmentsMap: Map<number, GarmentResponse[]> = new Map();

  outfitService = inject(OutfitService)
  imageService = inject(ImageService);


  constructor(
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loadOutfits();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
  }

  loadOutfits(): void {
    this.outfitService.getAllOutfitsObservable().subscribe({
      next: (outfits) => {

        outfits.forEach(outfit => {
          if (outfit.image_link) {
            outfit.image_link = this.imageService.getImageLink(outfit.image_link);
          }
        });

        this.outfitList = outfits;

        outfits.forEach(outfit => {
          this.loadGarmentsForOutfit(outfit.id);
        });

      },
      error: (error) => { this.snackBar.open(error.error?.detail || 'An error occurred. Please try again.', 'Close'); }
    });
  }

  loadGarmentsForOutfit(outfitId: number): void {
    this.outfitService.getGarmentsFromOutfitByIdObservable(outfitId).subscribe({
      next: (garments) => {

        garments.forEach(garment => {
          if (garment.image_link) {
            garment.image_link = this.imageService.getImageLink(garment.image_link);
          }
        });

        this.outfitGarmentsMap.set(outfitId, garments);

      },
      error: (error) => { console.error(`Error loading garments for outfit ${outfitId}:`, error); }
    });
  }

  prepareGarmentsForOutfitById(outfitId: number): GarmentResponse[] {
    return this.outfitGarmentsMap.get(outfitId) || [];
  }
}
