import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ClothesComponent } from './pages/clothes/clothes.component';
import { GarmentDetailsComponent } from './pages/garment-details/garment-details.component';
import { OutfitCreatorComponent } from './pages/outfit-creator/outfit-creator.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "sinup", component: SignupComponent},
  {path: "clothes", component: ClothesComponent},
  {path: "details/:id", component: GarmentDetailsComponent },
  {path: "creator", component: OutfitCreatorComponent },
  {path: "**", component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
