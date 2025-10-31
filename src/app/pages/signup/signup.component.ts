import { Component, OnInit } from '@angular/core';
import {
  Validators,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: false
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  hideNewPass: boolean = true;
  hideConfirmPass: boolean = true;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator()]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  ngOnInit() { }

  passwordValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      const hasNumber = /[0-9]/.test(value);
      const hasLetter = /[a-zA-Z]/.test(value);

      const passwordValid = hasNumber && hasLetter;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  doPasswordsMatch(): boolean {
    const password = this.password?.value;
    const confirmPassword = this.confirmPassword?.value;
    return password === confirmPassword && password !== '' && confirmPassword !== '';
  }

  get email() {
    return this.signupForm.get('email');
  }
  get username() {
    return this.signupForm.get('username');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  getEmailErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }
    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }

  getUsernameErrorMessage() {
    if (this.username?.hasError('required')) {
      return 'Username is required';
    }
    return this.username?.hasError('minlength')
      ? 'Username must be at least 1 character'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    }
    if (this.password?.hasError('minlength')) {
      return 'Password must be at least 8 characters';
    }
    if (this.password?.hasError('passwordStrength')) {
      return 'Password must contain letters and numbers';
    }
    return '';
  }

  getConfirmPasswordErrorMessage() {
    if (this.confirmPassword?.hasError('required')) {
      return 'Please confirm your password';
    }
    if (
      this.signupForm.hasError('passwordMismatch') &&
      this.confirmPassword?.touched
    ) {
      return 'Passwords do not match';
    }
    return '';
  }

  onSubmit() {
    if (this.signupForm.valid) {
      // TODO
      console.log('Form submitted:', this.signupForm.value);
      alert('Form submitted');
    } else {
      Object.keys(this.signupForm.controls).forEach((key) => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }
}
