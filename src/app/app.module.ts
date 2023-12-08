import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppHeaderComponent } from './app-header/app-header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SignupComponent } from './pages/signup/signup.component';
import { GarmentComponent } from './components/garment/garment.component';
import { ClothesComponent } from './pages/clothes/clothes.component';
import { GarmentDetailsComponent } from './pages/garment-details/garment-details.component';
import { OutfitCreatorComponent } from './pages/outfit-creator/outfit-creator.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OutfitsComponent } from './pages/outfits/outfits.component';
import { OutfitComponent } from './components/outfit/outfit.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProfileComponent } from './pages/profile/profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchComponent } from './pages/search/search.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { FeedComponent } from './pages/feed/feed.component';
import { FeedElementComponent } from './components/feed-element/feed-element.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    GarmentComponent,
    ClothesComponent,
    GarmentDetailsComponent,
    OutfitCreatorComponent,
    OutfitsComponent,
    OutfitComponent,
    NotFoundComponent,
    ProfileComponent,
    SearchComponent,
    UserTableComponent,
    ProfileEditComponent,
    FeedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    DragDropModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
