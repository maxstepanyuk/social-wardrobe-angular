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
    OutfitsComponent
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
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
