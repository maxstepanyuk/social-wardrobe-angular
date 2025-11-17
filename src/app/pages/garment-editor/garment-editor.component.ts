import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GarmentCreate } from 'src/app/models/garment';
import { GarmentService } from 'src/app/servises/garment.service';
import { ImageService } from 'src/app/servises/image.service';

@Component({
  selector: 'app-garment-editor',
  standalone: false,
  templateUrl: './garment-editor.component.html',
  styleUrl: './garment-editor.component.scss',
})
export class GarmentEditorComponent implements OnInit {
  garmentForm: FormGroup;

  isEditMode = false;
  garmentId: number | null = null;
  isLoading = false;
  isUploadingImage = false;

  displayedImageLinkOrB64: string | null = null;  // currently shown
  originalImage1: string | null = null;  // From DB (image_link)
  originalImage2Filename: string | null = null; // To delete old image
  newImagePreviewB64: string | null = null; // Preview of new file
  newImageFile: File | null = null;     // New file selected

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private garmentService: GarmentService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.garmentForm = this.fb.group({
      name: [null],
      description: [null],
      hex: [null, [
        /*this.HexValidator()*/
      ]],
      // image_link: [''], //todo add?
      last_worn: [null],
      gender_id: [null],
      category_master_id: [null],
      category_sub_id: [null],
      type_id: [null],
      color_id: [null],
      season_id: [null],
      usage_id: [null]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.garmentId = Number(params['id']);
        this.loadGarment(this.garmentId);
      }
    });
  }

  loadGarment(id: number): void {
    this.isLoading = true;
    this.garmentService.getGarmentByIdObservable(id).subscribe({
      next: (garment) => {
        // console.log(garment);
        this.garmentForm.patchValue(garment);

        if (garment.image_link) {
          this.originalImage1 = garment.image_link;
          this.displayedImageLinkOrB64 = this.imageService.getImageLink(this.originalImage1);
          this.originalImage1 = garment.image_link;
        }

        this.isLoading = false;
      },
      error: (error) => {
        // console.error(error);
        this.errorMessage = error.error?.detail || 'An error occurred during signup. Please try again.';
        this.snackBar.open(this.errorMessage, 'Close');
        this.isLoading = false;
      }
    })


  }

  onFileSelected(event: Event): void {
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

    if (this.originalImage1) {
      this.displayedImageLinkOrB64 = this.imageService.getImageLink(this.originalImage1);
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

  onSubmit(): void {
    if (this.garmentForm.invalid) {
      this.garmentForm.markAllAsTouched();
      return;
    }
    if (this.newImageFile) {
      this.uploadAndSaveGarment();
    } else {
      this.saveGarment();
    }
  }

  uploadAndSaveGarment(): void {
    if (!this.newImageFile) return;

    this.isUploadingImage = true;

    this.imageService.uploadImage(this.newImageFile).subscribe({
      next: (response) => {
        if (this.originalImage1) {

          this.imageService.deleteImage(this.originalImage1).subscribe({
            // next: () => console.log('Old image deleted'), 
            error: (error) => {
              this.errorMessage = error.error?.detail || 'Error deleting old image.';
              // this.errorMessage = 'Error deleting old image.';
              this.snackBar.open(this.errorMessage, 'Close');
            }
          });

        }
        // Save garment with new image filename
        this.saveGarment(response.filename_store);

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

  saveGarment(imageFilename?: string): void {
    this.isLoading = true;
    const garmentData: GarmentCreate = this.garmentForm.value;

    if (imageFilename) {
      garmentData.image_link = imageFilename;
    } else if (this.originalImage1) {
      garmentData.image_link = this.originalImage1;
    }

    if (this.isEditMode && this.garmentId) {
      this.updateGarment(this.garmentId, garmentData);
    } else {
      this.createGarment(garmentData);
    }
  }

  createGarment(garment: GarmentCreate): void {
    this.garmentService.createGarmentObservable(garment).subscribe({
      next: (response) => {
        // console.log(response)
        this.snackBar.open('Garment created successfully', 'Close', { duration: 5000 })
        this.router.navigate(['/clothes']);
        this.isLoading = false;
      },
      error: (error) => {
        // console.error(error);
        this.errorMessage = error.error?.detail || 'An error occurred during update.';
        this.snackBar.open(this.errorMessage, 'Close');
        this.isLoading = false;
      }
    });
  }

  updateGarment(id: number, garment: GarmentCreate): void {
    this.garmentService.updateGarmentObservable(id, garment).subscribe({
      next: (response) => {
        this.snackBar.open('Garment updated successfully', 'Close', { duration: 5000 });
        this.router.navigate(['/clothes']);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.detail || 'An error occurred during update.';
        this.snackBar.open(this.errorMessage, 'Close');
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/clothes']);
  }

  getErrorMessage(field: string): string {
    const control = this.garmentForm.get(field);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength}`;
    }
    return '';
  }

  onDelete(): void {
    if (!this.garmentId) return;

    this.isLoading = true;
    let garmentDeleteSecces = false;
    let imageDeleteSecces = false;

    this.garmentService.deleteGarmentObservable(this.garmentId).subscribe({
      next: (res) => {
        garmentDeleteSecces = true;

        if (this.originalImage1) {
          this.imageService.deleteImage(this.originalImage1).subscribe({
            next: (res) => {
              console.log(res);
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

        if (garmentDeleteSecces && imageDeleteSecces) {
          this.snackBar.open('Garment deleted successfully', 'Close', { duration: 5000 });
        }

        this.isLoading = false;
        this.router.navigate(['/clothes']);

      },
      error: (error) => {
        this.errorMessage = error.error?.detail || 'An error occurred during delete.';
        this.snackBar.open(this.errorMessage, 'Close');

        this.isLoading = false;
      }
    })



  }

}
