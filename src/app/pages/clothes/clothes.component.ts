import { Component, inject, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { GarmentResponse } from '../../models/garment';
import { GarmentService } from '../../servises/garment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from 'src/app/servises/image.service';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss'],
  standalone: false
})
export class ClothesComponent implements OnInit {

  garmentList: GarmentResponse[] = [];
  garmentService = inject(GarmentService)
  imageService = inject(ImageService);
  snackBar = inject(MatSnackBar)

  areFullyEmbedded = false;
  unprocessed = 0;
  total = 0;
  processed = 0;
  isLoading = false;

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData() {
    this.isLoading = true;

    forkJoin({
      garments: this.garmentService.getAllGarmentsObservable(),
      stats: this.garmentService.checkGarmentEmbeddings()
    }).subscribe({
      next: ({ garments, stats }) => {

        this.garmentList = garments;
        this.garmentList.forEach(element => {
          if (element.image_link) {
            element.image_link = this.imageService.getImageLink(element.image_link)
          }
        });

        this.unprocessed = stats.unprocessed;
        this.total = stats.total;
        this.processed = stats.processed;
        
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open(
          error.error?.detail || 'An error occurred loading data. Please try again.', 
          'Close'
        );
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

        if (response.failed > 0){
          this.snackBar.open('An error occurred creating garment embeddings.', 'Close');
        } else {
          this.snackBar.open('Garment embeddings created.', 'Close');
        }
        

        this.isLoading = false
      },
      error: (error) => {
        this.snackBar.open(error.error?.detail || 'An error occurred creating garment embeddings.', 'Close');
        this.isLoading = false
      }
    })
  }

}
