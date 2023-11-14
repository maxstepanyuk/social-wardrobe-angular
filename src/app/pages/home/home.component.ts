import { Component } from '@angular/core';
// import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
// import {MatDialogModule} from '@angular/material/dialog';
import {MatDialog} from '@angular/material/dialog';

import { AuthenticationComponent } from 'src/app/forms/authentication/authentication.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  // constructor(private loginDialog: MatDialogModule){}
  constructor(private loginDialog: MatDialog){}

  openHomeAuthenticationDialog(){
    this.loginDialog.open(AuthenticationComponent)
  }
}
