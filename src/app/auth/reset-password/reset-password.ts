import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-reset-password',
  standalone: true, // ✅ REQUIRED
  imports: [ReactiveFormsModule,CommonModule, MatSnackBarModule], // ✅ REQUIRED
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css'], // ✅ FIXED
})
export class ResetPassword implements OnInit {


  token = '';

  loading = false;
  error: string | null = null;
  success = false;

  showPassword = false;
  showConfirmPassword = false;

  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.token =this.route.snapshot.queryParamMap.get('token') || '';

    console.log('TOKEN => ', this.token);
    console.log('Length:', this.token.length);

    // Same logic as React
    if (!this.token) {
      this.router.navigate(['/login']);
    }
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  onSubmit() {

    this.error = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (
      this.form.value.password !==
      this.form.value.confirmPassword
    ) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;

    this.authService.resetPassword(
        this.token,
        this.form.value.password
      )
      .subscribe({
        next: () => {
          this.loading = false;
           this.snackBar.open(
      '✅ Password reset successfully!',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      }
    );
     setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);

  
          this.success = true;

        },
        error: (err) => {
          this.loading = false;


    this.snackBar.open(
      err.error?.message || 'Password reset failed',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      }
    );
          this.error = err;
        }
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
