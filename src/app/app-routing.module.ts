import { NgModule } from '@angular/core';
import { RouterModule, Routes, ROUTER_CONFIGURATION } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ClothesComponent } from './pages/clothes/clothes.component';
import { OutfitsComponent } from './pages/outfits/outfits.component';
import { GarmentDetailsComponent } from './pages/garment-details/garment-details.component';
import { OutfitCreatorComponent } from './pages/outfit-creator/outfit-creator.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { FeedComponent } from './pages/feed/feed.component';

const routes: Routes = [
  { path: "", component: HomeComponent }, //landing
  { path: "login", component: LoginComponent }, //todo logic
  { path: "signup", component: SignupComponent }, //todo logic
  { path: "clothes", component: ClothesComponent }, //get all clothes(garments)
  //TODO rename `details` to `clothes` OR `garments`
  { path: "details", component: GarmentDetailsComponent }, //TODO garment create NEW
  { path: "details/:id", component: GarmentDetailsComponent }, //garment get, edit(TODO), delete(TODO)
  { path: "outfits", component: OutfitsComponent }, //get all outfit
  { path: "outfit/:id", component: OutfitCreatorComponent }, //TODO outfit get(TODO), edit(TODO), delete(TODO)
  { path: "creator", component: OutfitCreatorComponent }, //outfit create
  { path: "profile/edit", component: ProfileEditComponent }, //TODO id
  { path: "profile/:id", component: ProfileComponent }, //TODO id
  { path: "search", component: SearchComponent },
  { path: "feed", component: FeedComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  //for similar behavior in Angular version 17 like in 16.
  //providers array can be omitted altogether
  providers: [ 
    { provide: ROUTER_CONFIGURATION, useValue: {  
        paramsInheritanceStrategy: 'always',
        urlUpdateStrategy: 'deferred',
        urlHandlingStrategy: 'path',
        titleStrategy: 'default',
        canceledNavigationResolution: 'completed'
    } }
  ]
})
export class AppRoutingModule { }
