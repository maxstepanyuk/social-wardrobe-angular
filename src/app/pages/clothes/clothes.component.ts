import { Component, inject } from '@angular/core';
// import { Garment } from 'src/app/components/garment/garment';
import { GarmentOld, GarmentResponse } from '../../models/garment';
import { GarmentService } from '../../servises/garment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from 'src/app/servises/image.service';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss'],
  standalone: false
})
export class ClothesComponent {
  garmentList: GarmentResponse[] = [];
  garmentService: GarmentService = inject(GarmentService)
  imageService = inject(ImageService);

  areFullyEmbedded = false;
  unprocessed = 0;
  total = 0;
  processed = 0;
  isLoading = false;

  constructor(
    private snackBar: MatSnackBar,
  ) {
    this.garmentService.getAllGarmentsObservable().subscribe({
      next: (response) => {
        this.garmentList = response;
        response.forEach(element => {
          if (element.image_link) {
            element.image_link = this.imageService.getImageLink(element.image_link)
          }
        });
      },
      error: (error) => {
        this.snackBar.open(error.error?.detail || 'An error occurred. Please try again.', 'Close');
        // console.error(error);
      }
    })
    this.garmentService.checkGarmentEmbeddings().subscribe({
      next: (response) => {
        this.unprocessed = response.unprocessed;
        this.total = response.total
        this.processed = response.processed
      },
      error: (error) => {
        this.snackBar.open(error.error?.detail || 'An error occurred checking garment embeddings.', 'Close');
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
  }

  createEmbeddings(force_rewrite = false) {
    this.isLoading = true;
    this.garmentService.createGarmentEmbeddings(force_rewrite).subscribe({
      next: (response) => {
        this.unprocessed = response.failed // ok? idk
        this.processed = response.processed
        this.isLoading = false
      },
      error: (error) => {
        this.snackBar.open(error.error?.detail || 'An error occurred creating garment embeddings.', 'Close');
        this.isLoading = false
      }
    })
  }

}
