import { Component, inject } from '@angular/core';
// import { Garment } from 'src/app/components/garment/garment';
import { GarmentOld, GarmentResponse } from '../../models/garment';
import { GarmentService } from '../../servises/garment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss'],
  standalone: false
})
export class ClothesComponent {
  garmentList: GarmentResponse[] = [];
  garmentService: GarmentService = inject(GarmentService)

  constructor(
    private snackBar: MatSnackBar,
  ) {
    this.garmentService.getAllGarmentsObservable().subscribe({
      next: (response) => {this.garmentList = response;},
      error: (error) => {
        this.snackBar.open(error.error?.detail || 'An error occurred. Please try again.', 'Close');
        // console.error(error);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
  }
}
