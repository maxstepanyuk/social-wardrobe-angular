import { Component, inject, OnInit } from '@angular/core';
import { OutfitOld, OutfitResponse } from 'src/app/models/outfit';
import { OutfitService } from '../../servises/outfit.service';
import { GarmentResponse } from 'src/app/models/garment';
import { GarmentService } from 'src/app/servises/garment.service';
import { ImageService } from 'src/app/servises/image.service';
import { forkJoin } from 'rxjs';

interface feedItemType {
  type: "garment" | "outfit"
}

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
    standalone: false
})
export class FeedComponent implements OnInit {
  isLoading: boolean = false;

  garmentList: GarmentResponse[] = [];
  outfitList: OutfitResponse[] = [];

  feedElements: OutfitResponse[] | GarmentResponse[] = [];

  garmentService = inject(GarmentService)
  outfitService = inject(OutfitService)
  imageService = inject(ImageService);


  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    forkJoin({
      garments: this.garmentService.getAllGarmentsObservable(),
      outfits: this.outfitService.getAllOutfitsObservable(),
    }).subscribe({
      next: ({ garments, outfits }) => {

        this.garmentList = garments;
        this.garmentList.forEach(element => {
          if (element.image_link) {
            element.image_link = this.imageService.getImageLink(element.image_link)
          }
        });

        this.outfitList = outfits;
        this.outfitList.forEach(element => {
          if (element.image_link) {
            element.image_link = this.imageService.getImageLink(element.image_link)
          }
        });

        // todo??
        // outfits.forEach(outfit => {
        //   this.loadGarmentsForOutfit(outfit.id);
        // });

        this.createFeedElements()

      },
      error: (error) => {
        this.isLoading = false;

        alert(error.error?.detail || 'An error occurred loading data. Please try again.') //temp
        // this.snackBar.open(
        //   error.error?.detail || 'An error occurred loading data. Please try again.',
        //   'Close'
        // );
      }
    })
  }

  createFeedElements() {

    // for llm
    //       ask to do this
    //  aks for better ways to create this feature


    // add a type : 'garment' to all objects in the garmentList array with .map()
    // add a type : 'garment' to all objects in the outfitList array with .map()

    // concat the two new arrays 

    // sort by date (when edited if last worn)

    // set feedElements array
  }

  constructor() {
  }
}
