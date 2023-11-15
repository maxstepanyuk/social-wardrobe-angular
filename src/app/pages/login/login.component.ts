import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Enter a valid email';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  //password
  hidePass: boolean = true;

  //todo: validation
}
