import { Component } from '@angular/core';
import { User } from 'src/app/components/user-table/user';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  newImage: string | undefined;

  constructor() {
    this.newImage = undefined;

  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.newImage = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
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
