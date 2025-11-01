import { Component, inject, OnInit } from '@angular/core';
import {
  Validators,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/servises/auth.service';
import { UserCreate, UserResponse } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: false
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  router = inject(Router);
  hideNewPass: boolean = true;
  hideConfirmPass: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';

  private authService: AuthService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
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

  prepareUser(): UserCreate {
    const { email, username, password } = this.signupForm.value;
    return {
      login: username,
      email: email,
      password: password,
    }
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.signupForm.valid) {

      this.signupForm.disable();
      const userData = this.prepareUser();

      this.authService.postUser(userData).subscribe({
        next: (response: UserResponse) => {
          // console.log(response)
          this.successMessage = 'Account created successfully!';
          const bar = this.snackBar.open(this.successMessage, 'Login');
          bar.onAction().subscribe(() => {this.router.navigate(['/login']);})
          this.signupForm.reset();
          this.signupForm.enable();
        },
        error: (error) => {
          this.isLoading = false;
          
          this.signupForm.enable();
          this.errorMessage = error.error?.detail || 'An error occurred during signup. Please try again.';
          this.snackBar.open(this.errorMessage, 'Close');
          // console.error('Signup error:', error);
        }
      });

    } else {
      Object.keys(this.signupForm.controls).forEach((key) => {
        this.signupForm.get(key)?.markAsTouched();
      });
    }
  }
}
