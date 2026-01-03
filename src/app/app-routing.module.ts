import { NgModule } from '@angular/core';
import { RouterModule, Routes, ROUTER_CONFIGURATION } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ClothesComponent } from './pages/clothes/clothes.component';
import { OutfitsComponent } from './pages/outfits/outfits.component';
// import { GarmentDetailsComponent } from './pages/garment-details/garment-details.component'; //old
import { OutfitCreatorComponent } from './pages/outfit-creator/outfit-creator.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { FeedComponent } from './pages/feed/feed.component';
import { GarmentEditorComponent } from './pages/garment-editor/garment-editor.component';
import { OutfitGeneratorRandomComponent } from './pages/outfit-generator-random/outfit-generator-random.component';
import { OutfitGeneratorParametersComponent } from './pages/outfit-generator-parameters/outfit-generator-parameters.component';

const routes: Routes = [
  { path: "", component: HomeComponent, title: "OrgDrobe" }, //landing
  { path: "login", component: LoginComponent, title: "Login - OrgDrobe" }, //todo logic
  { path: "signup", component: SignupComponent, title: "Signup - OrgDrobe" }, //todo logic
  { path: "clothes", component: ClothesComponent, title: "Clothes - OrgDrobe" }, //get all clothes(garments)
  { path: "garments/editor", component: GarmentEditorComponent, title: "Create Garment - OrgDrobe" },
  { path: "garments/editor/:id", component: GarmentEditorComponent, title: "Edit Garment - OrgDrobe" },
  { path: "outfits", component: OutfitsComponent, title: "Outfits - OrgDrobe" }, //get all outfit
  { path: "outfit/:id", component: OutfitCreatorComponent, title: "Edit Outfit - OrgDrobe" }, //TODO outfit get(TODO), edit(TODO), delete(TODO)
  { path: "outfit/generator/random", component: OutfitGeneratorRandomComponent, title: "Outfit Randomizer - OrgDrobe" },
  { path: "outfit/generator/parameters", component: OutfitGeneratorParametersComponent , title: "Outfit Generator with Filters - OrgDrobe"},
  { path: "creator", component: OutfitCreatorComponent, title: "Create Outfit (Editor) - OrgDrobe" }, //outfit create
  // { path: "profile/edit", component: ProfileEditComponent }, //TODO id
  // { path: "profile/:id", component: ProfileComponent }, //TODO id
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
    {
      provide: ROUTER_CONFIGURATION, useValue: {
        paramsInheritanceStrategy: 'always',
        urlUpdateStrategy: 'deferred',
        urlHandlingStrategy: 'path',
        titleStrategy: 'default',
        canceledNavigationResolution: 'completed'
      }
    }
  ]
})
export class AppRoutingModule { }
