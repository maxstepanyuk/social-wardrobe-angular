import { Component, OnInit } from '@angular/core';
import { GarmentResponse } from 'src/app/models/garment';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { OutfitService } from 'src/app/servises/outfit.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageService } from 'src/app/servises/image.service';
import { GarmentService } from 'src/app/servises/garment.service';
import { OutfitCreate, OutfitResponse } from 'src/app/models/outfit';
import { UtilsService } from 'src/app/servises/utils.service';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-outfit-creator',
  templateUrl: './outfit-creator.component.html',
  styleUrls: ['./outfit-creator.component.scss'],
  standalone: false
})
export class OutfitCreatorComponent implements OnInit {

  outfitForm: FormGroup;
  outfitGarments: GarmentResponse[] = [];
  wardrobeGarmentsUnused: GarmentResponse[] = [];

  wardrobeGarmentsCount: number | null = null;

  isEditMode = false;
  outfitId: number | null = null;

  isLoading = false;
  isUploadingImage = false;

  displayedImageLinkOrB64: string | null = null;  // currently shown
  originalImage: string | null = null;  // From DB (image_link)
  newImagePreviewB64: string | null = null; // Preview of new file
  newImageFile: File | null = null;     // New file selected

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private outfitService: OutfitService,
    private garmentService: GarmentService,
    private imageService: ImageService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.outfitForm = this.fb.group({
      name: [null],
      description: [null],
      image_link: [null],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.outfitId = Number(params['id']);
        this.loadDataForEdit(this.outfitId);
      } else {
        this.loadDataForCreate();
      }
    });
  }

  loadDataForEdit(outfitId: number): void {
    this.isLoading = true;
    forkJoin({
      outfitInfo: this.outfitService.getOutfitByIdObservable(outfitId),
      outfitGarments: this.outfitService.getGarmentsFromOutfitByIdObservable(outfitId),
      unusedGarments: this.outfitService.getUnusedGarmentsInOutfitByIdObservable(outfitId),
      count: this.garmentService.getAllGarmentsCountObservable(),
    }).subscribe({
      next: (data) => {
        this.wardrobeGarmentsCount = data.count;

        if (data.outfitInfo.image_link) {
          this.originalImage = data.outfitInfo.image_link;
          this.displayedImageLinkOrB64 = this.imageService.getImageLink(data.outfitInfo.image_link);
        }
        this.outfitForm.patchValue(data.outfitInfo);

        // Process outfit garments
        data.outfitGarments.forEach(garment => {
          if (garment.image_link) {
            garment.image_link = this.imageService.getImageLink(garment.image_link);
          }
        });
        this.outfitGarments = data.outfitGarments;

        // Process unused garments
        data.unusedGarments.forEach(garment => {
          if (garment.image_link) {
            garment.image_link = this.imageService.getImageLink(garment.image_link);
          }
        });
        this.wardrobeGarmentsUnused = data.unusedGarments;

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading outfit data:', error);
        this.errorMessage = error.error?.detail || 'An error occurred loading outfit data.';
        this.snackBar.open(this.errorMessage, 'Close');
        this.isLoading = false;
      }
    });
  }

  loadDataForCreate(): void {
    this.isLoading = true;
    forkJoin({
      garments: this.garmentService.getAllGarmentsObservable(),
      count: this.garmentService.getAllGarmentsCountObservable(),
    }).subscribe({
      next: (data) => {
        this.wardrobeGarmentsCount = data.count;

        data.garments.forEach(garment => {
          if (garment.image_link) {
            garment.image_link = this.imageService.getImageLink(garment.image_link);
          }
        });
        this.wardrobeGarmentsUnused = data.garments;

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading Error loading garments:', error);
        this.errorMessage = error.error?.detail || 'An error occurred loading garments.';
        this.snackBar.open(this.errorMessage, 'Close');
        this.isLoading = false;
      }
    });
  }

  drop(event: CdkDragDrop<GarmentResponse[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onSubmit(): void {
    if (this.outfitForm.invalid) {
      this.outfitForm.markAllAsTouched();
      return;
    }
    if (this.newImageFile) {
      this.uploadAndSaveOutfit();
    } else {
      this.saveOutfitComplete();
    }
  }

  uploadAndSaveOutfit(): void {
    if (!this.newImageFile) return;

    this.isUploadingImage = true;

    this.imageService.uploadImage(this.newImageFile).subscribe({
      next: (response) => {
        if (this.originalImage) {

          this.imageService.deleteImage(this.originalImage).subscribe({
            error: (error) => {
              this.errorMessage = error.error?.detail || 'Error deleting old image.';
              this.snackBar.open(this.errorMessage, 'Close');
            }
          });

        }

        this.saveOutfitComplete(response.filename_store);

        this.isUploadingImage = false;
      },
      error: (error) => {
        console.error(error);
        // this.errorMessage = error.error?.detail || 'An error occurred during uploading image.';
        this.errorMessage = 'An error occurred during uploading image.';
        this.snackBar.open(this.errorMessage, 'Close');
        this.isUploadingImage = false;
      }
    });
  }

  saveOutfitComplete(imageFilename?: string): void {
    this.isLoading = true;

    let outfitData: OutfitCreate = this.outfitForm.value;

    if (imageFilename) {
      outfitData.image_link = imageFilename;
    } else if (this.originalImage) {
      outfitData.image_link = this.originalImage;
    }

    outfitData = this.utilsService.removeEmptyFields(outfitData);
    let outfitObservable: Observable<OutfitResponse>;
    if (this.isEditMode && this.outfitId) {
      outfitObservable = this.outfitService.updateOutfitObservable(this.outfitId, outfitData);
    } else {
      outfitObservable = this.outfitService.createOutfitObservable(outfitData);
    }

    outfitObservable.pipe(
      switchMap((outfit) => {
        const outfitId = outfit.id;
        const garmentIds = this.outfitGarments.map(g => g.id);
        return this.outfitService.updateOutfitGarments(outfitId, garmentIds).pipe(
          map(() => outfit) // Return the outfit for the next step
        );
      })
    ).subscribe({
      next: (outfit) => {
        const message = this.isEditMode
          ? 'Outfit updated successfully'
          : 'Outfit created successfully';
        this.snackBar.open(message, 'Close', { duration: 5000 });
        this.isLoading = false;
        this.router.navigate(['/outfits']);
      },
      error: (error) => {
        this.errorMessage = error.error?.detail || 'An error occurred saving outfit.';
        this.snackBar.open(this.errorMessage, 'Close');
        this.isLoading = false;
      }
    });
  }

  createOutfit(outfit: OutfitCreate): void {
    this.outfitService.createOutfitObservable(outfit).subscribe({
      next: (response) => {
        // console.log(response)
        this.snackBar.open('Outfit created successfully', 'Close', { duration: 5000 })
        this.router.navigate(['/outfits']);
        this.isLoading = false;
      },
      error: (error) => {
        // console.error(error);
        this.errorMessage = error.error?.detail || 'An error occurred during create.';
        this.snackBar.open(this.errorMessage, 'Close');
        this.isLoading = false;
      }
    });
  }

  updateOutfit(id: number, outfit: OutfitCreate): void {
    this.outfitService.updateOutfitObservable(id, outfit).subscribe({
      next: (response) => {
        this.snackBar.open('Outfit updated successfully', 'Close', { duration: 5000 });
        this.router.navigate(['/outfits']);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.detail || 'An error occurred during update.';
        this.snackBar.open(this.errorMessage, 'Close');
        this.isLoading = false;
      }
    })
  }

  onDelete(): void {
    if (!this.outfitId) return;

    this.isLoading = true;
    let DeleteSeccess = false;
    let imageDeleteSecces = false;

    this.outfitService.deleteOutfitByIdObservable(this.outfitId).subscribe({
      next: (res) => {
        DeleteSeccess = true;

        if (this.originalImage) {
          this.imageService.deleteImage(this.originalImage).subscribe({
            next: (res) => {
              imageDeleteSecces = true;
            },
            error: (error) => {
              this.errorMessage = error.error?.detail || 'An error occurred during delete.';
              this.snackBar.open(this.errorMessage, 'Close');
              this.isLoading = false;
            }
          })
        } else {
          imageDeleteSecces = true;
        }

        if (DeleteSeccess && imageDeleteSecces) {
          this.snackBar.open('Outfit deleted successfully', 'Close', { duration: 5000 });
        }

        this.isLoading = false;
        this.router.navigate(['/outfits']);

      },
      error: (error) => {
        this.errorMessage = error.error?.detail || 'An error occurred during delete.';
        this.snackBar.open(this.errorMessage, 'Close');

        this.isLoading = false;
      }
    })
  }

  onCancel(): void {
    this.router.navigate(['/outfits']);
  }

  onFileSelected(event: Event): void {
    //move to util (and make it return the selected file) (logseq)
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        this.snackBar.open('Please select an image file', 'Close');
        return;
      }

      const maxSizeBytes = 10 * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        this.snackBar.open('File size must be less than 10MB', 'Close');
        return;
      }

      this.newImageFile = file;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.newImagePreviewB64 = e.target?.result as string;
        this.displayedImageLinkOrB64 = this.newImagePreviewB64;

      };
      reader.readAsDataURL(file);
    }
  }

  removeNewImage(): void {
    this.newImageFile = null;
    this.newImagePreviewB64 = null;

    if (this.originalImage) {
      this.displayedImageLinkOrB64 = this.imageService.getImageLink(this.originalImage);
    } else {
      this.displayedImageLinkOrB64 = null;
    }

    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput?.click();
  }

  saveOutfitGarments(): void {
    if (!this.outfitId) return;

    this.isLoading = true;
    const garmentIds = this.outfitGarments.map(g => g.id);

    console.log('saveOutfitGarments() - garmentIds', garmentIds)

    this.outfitService.updateOutfitGarments(this.outfitId, garmentIds).subscribe({
      next: () => {
        this.snackBar.open('Outfit garments updated successfully', 'Close', { duration: 5000 });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.detail || 'Error updating outfit garments';
        this.snackBar.open(this.errorMessage, 'Close');
        this.isLoading = false;
      }
    });
  }
}
