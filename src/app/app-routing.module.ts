import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ClothesComponent } from './pages/clothes/clothes.component';
import { OutfitsComponent } from './pages/outfits/outfits.component';
import { GarmentDetailsComponent } from './pages/garment-details/garment-details.component';
import { OutfitCreatorComponent } from './pages/outfit-creator/outfit-creator.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: "", component: HomeComponent }, //landing
  { path: "login", component: LoginComponent },
  { path: "sinup", component: SignupComponent },
  { path: "clothes", component: ClothesComponent }, //get all clothes(garments)
  { path: "details/:id", component: GarmentDetailsComponent }, //garment get, edit(TODO), delete(TODO)
  { path: "creator", component: OutfitCreatorComponent }, //outfit create
  { path: "outfits", component: OutfitsComponent }, //get all outfit
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
