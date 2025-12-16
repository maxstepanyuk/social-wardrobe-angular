import { Component, inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/servises/auth.service';
import { UserLoginEmailPass } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  router = inject(Router);
  hidePass: boolean = true;

  errorMessage: string = '';
  successMessage: string = '';

  private authService: AuthService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      },

    );
  }

  ngOnInit() { }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  getEmailErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }
    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    }
    return '';
  }

  prepareUser(): UserLoginEmailPass {
    const { email, password } = this.loginForm.value;
    return {
      email: email,
      password: password,
    }
  }


  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.valid) {

      this.loginForm.disable();
      const userData: UserLoginEmailPass = this.prepareUser();

      this.authService.authWithEmailPass(userData)
        .subscribe({
          next: (response: Token) => {
            this.authService.saveToken(response);
            this.successMessage = 'Login successful!';
            this.snackBar.open(this.successMessage, 'Close', { duration: 5000 });
            this.loginForm.reset();
            this.loginForm.enable();
            this.router.navigate(['/clothes']);
          },
          error: (error) => {
            // console.error('Signup error:', error);
            this.loginForm.enable();
            this.errorMessage = error.error?.detail || 'An error occurred during login. Please try again.';
            this.snackBar.open(this.errorMessage, 'Close');
          }
        });

    } else {
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}
