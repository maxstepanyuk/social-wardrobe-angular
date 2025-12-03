import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { CategoryMasterResponse, CategorySubResponse } from 'src/app/models/category';
import { ColorResponse } from 'src/app/models/color';
import { FilterGarmentsByParams, GarmentResponse } from 'src/app/models/garment';
import { GarmentTypeResponse } from 'src/app/models/garment-type';
import { GenderResponse } from 'src/app/models/gender';
import { OutfitCreate } from 'src/app/models/outfit';
import { SeasonResponse } from 'src/app/models/season';
import { UsageResponse } from 'src/app/models/usage';
import { CategoryService } from 'src/app/servises/category.service';
import { ColorService } from 'src/app/servises/color.service';
import { GarmentTypeService } from 'src/app/servises/garment-type.service';
import { GarmentService } from 'src/app/servises/garment.service';
import { GenderService } from 'src/app/servises/gender.service';
import { ImageService } from 'src/app/servises/image.service';
import { OutfitService } from 'src/app/servises/outfit.service';
import { SeasonService } from 'src/app/servises/season.service';
import { UsageService } from 'src/app/servises/usage.service';

@Component({
  selector: 'app-outfit-generator-parameters',
  standalone: false,
  templateUrl: './outfit-generator-parameters.component.html',
  styleUrl: './outfit-generator-parameters.component.scss'
})
export class OutfitGeneratorParametersComponent implements OnInit {

  filterForm: FormGroup;
  isLoading = false;

  wardrobeGarmentsCount: number | null = null;

  genders: GenderResponse[] = [];
  masterCategories: CategoryMasterResponse[] = [];
  subCategories: CategorySubResponse[] = [];
  garmentTypes: GarmentTypeResponse[] = [];
  colors: ColorResponse[] = [];
  seasons: SeasonResponse[] = [];
  usages: UsageResponse[] = [];


  sourceGarments: GarmentResponse[] = []; // Left Side (Filtered)
  outfitGarments: GarmentResponse[] = []; // Right Side (Outfit)

  outfitService = inject(OutfitService);


  constructor(
    private fb: FormBuilder,
    private garmentService: GarmentService,
    private genderService: GenderService,
    private categoryService: CategoryService,
    private garmentTypeService: GarmentTypeService,
    private colorService: ColorService,
    private seasonService: SeasonService,
    private usageService: UsageService,
    public imageService: ImageService, // Public for HTML access
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    // Initialize form with array controls for multi-select
    this.filterForm = this.fb.group({
      gender_ids: [[]],
      category_master_ids: [[]],
      category_sub_ids: [[]],
      garment_type_ids: [[]],
      color_ids: [[]],
      season_ids: [[]],
      usage_ids: [[]],
      name: [null]
    });
  }

  ngOnInit(): void {
    this.loadData();
    // Optionally load all garments initially
    this.applyFilters();
  }

  loadData(): void {
    this.isLoading = true;
    forkJoin({
      genders: this.genderService.getAllGendersObservable(),
      masterCategories: this.categoryService.getAllMasterCategoriesObservable(),
      subCategories: this.categoryService.getAllSubCategoriesObservable(),
      garmentTypes: this.garmentTypeService.getAllGarmentTypesObservable(),
      colors: this.colorService.getAllColorsObservable(),
      seasons: this.seasonService.getAllSeasonsObservable(),
      usages: this.usageService.getAllUsesObservable(),
      count: this.garmentService.getAllGarmentsCountObservable(),
    }).subscribe({
      next: (data) => {
        this.genders = data.genders;
        this.masterCategories = data.masterCategories;
        this.subCategories = data.subCategories;
        this.garmentTypes = data.garmentTypes;
        this.colors = data.colors;
        this.seasons = data.seasons;
        this.usages = data.usages;
        this.wardrobeGarmentsCount = data.count;

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dropdowns', error);
        this.snackBar.open('Failed to load filter options', 'Close');
        this.isLoading = false;
      }
    });
  }





  applyFilters(): void {
    this.isLoading = true;
    const formValue = this.filterForm.value;

    console.log(this.filterForm.value)

    // Construct the payload, removing empty arrays to keep request clean
    const params: FilterGarmentsByParams = {};

    if (formValue.gender_ids?.length) params.gender_ids = formValue.gender_ids;
    if (formValue.category_master_ids?.length) params.category_master_ids = formValue.category_master_ids;
    if (formValue.category_sub_ids?.length) params.category_sub_ids = formValue.category_sub_ids;
    if (formValue.garment_type_ids?.length) params.garment_type_ids = formValue.garment_type_ids;
    if (formValue.color_ids?.length) params.color_ids = formValue.color_ids;
    if (formValue.season_ids?.length) params.season_ids = formValue.season_ids;
    if (formValue.usage_ids?.length) params.usage_ids = formValue.usage_ids;



    console.log(params)

    this.garmentService.filterGarmentsObservable(params).subscribe({
      next: (garments) => {
        // We need to filter out garments that are already in the "Target" list
        // so we don't duplicate them in the source list if the user filters again.

        garments.forEach(element => {
          if (element.image_link) {
            element.image_link = this.imageService.getImageLink(element.image_link)
          }
        });

        const targetIds = new Set(this.outfitGarments.map(g => g.id));
        this.sourceGarments = garments.filter(g => !targetIds.has(g.id));

        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open('Error filtering garments', 'Close');
        this.isLoading = false;
      }
    });
  }




  drop(event: CdkDragDrop<GarmentResponse[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  clearFilters(): void {
    this.filterForm.reset({
      gender_ids: [],
      category_master_ids: [],
      category_sub_ids: [],
      garment_type_ids: [],
      color_ids: [],
      season_ids: [],
      usage_ids: []
    });
    this.applyFilters();
  }

  saveOutfit(): void {
    if (this.outfitGarments.length === 0) {
      this.snackBar.open('Please add garments to the outfit first', 'Close');
      return;
    }



    const garmentIds = this.outfitGarments.map(g => g.id);

    const outfitData: OutfitCreate = {
      name: this.filterForm.get('name')?.value,
      description: 'Generated with Filters'
    };

    this.outfitService.createOutfitObservable(outfitData)
      .pipe(
        switchMap((newOutfit) => {
          return this.outfitService.updateOutfitGarments(newOutfit.id, garmentIds);
        })
      )
      .subscribe({
        next: () => {
          this.snackBar.open('Outfit saved successfully!', 'Close', { duration: 5000 });
        },
        error: (error) => {
          console.error('Error saving outfit:', error);
          this.snackBar.open('Failed to save outfit.', 'Close');
        }
      });
  }



}











