import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  
  //password
  newPass: string = "";
  hideNewPass: boolean = true;
  //todo: validation
  newPassWalid() {
    return "todo"
  }
  getNewPassErrorMessage() {
    return "todo"
  }
  newPassInvalid(): any {
    return "todo"
  }
  confiremPass: string = "";

  arePasswordsMatch(): any {
    return (this.newPass === this.confiremPass && this.newPass != "");
  }
}
