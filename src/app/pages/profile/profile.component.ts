import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OutfitOld } from 'src/app/models/outfit';
import { OutfitService } from '../../servises/outfit.service';
import { GarmentOld } from '../../models/garment';
import { GarmentService } from '../../servises/garment.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: false
})
export class ProfileComponent {
  garmentList: GarmentOld[] = [];
  garmentService: GarmentService = inject(GarmentService)
  outfitList: OutfitOld[] = [];
  outfitService: OutfitService = inject(OutfitService)
  
  following: Boolean;

  constructor(
    private snackBar: MatSnackBar
  ) {
    this.following = false;
    this.outfitList = this.outfitService.getAllOutfits();
    this.garmentList = this.garmentService.getAllGarments();

  }

  followUser() {
    this.following = !this.following;

    const message = this.following ? 'You are now following.' : 'You have unfollowed.';
    this.showSnackBar(message);
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000, 
      verticalPosition: 'bottom', 
    });
  }
}
