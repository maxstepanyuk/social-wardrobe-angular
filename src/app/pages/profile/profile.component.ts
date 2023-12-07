import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Outfit } from 'src/app/components/outfit/outfit';
import { OutfitService } from '../../servises/outfit.service';
import { Garment } from '../../components/garment/garment';
import { GarmentService } from '../../servises/garment.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  garmentList: Garment[] = [];
  garmentService: GarmentService = inject(GarmentService)
  outfitList: Outfit[] = [];
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
