import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/servises/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss',
  standalone: false
})
export class LogoutComponent {
  private authService: AuthService = inject(AuthService);
  router = inject(Router);

  constructor(
    private snackBar: MatSnackBar
  ) { }

  logout() {
    this.authService.logout();
    this.snackBar.open('Logged out successfully', 'Close');
    this.router.navigate(['/login']);
  }
}
