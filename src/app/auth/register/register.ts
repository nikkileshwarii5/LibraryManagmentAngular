import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true, // ✅ IMPORTANT
  imports: [
  ReactiveFormsModule,
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
  RouterModule
], // ✅ REQUIRED
  templateUrl: './register.html',
  styleUrls: ['./register.css'], // ✅ FIXED
})
export class Register {

  loading = false;
  error: string | null = null;
  showPassword = false;

  registerForm!: FormGroup; // ✅ declare first

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // ✅ initialize inside constructor
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.loading = true;

    this.authService.signup(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err;
      }
    });
  }
}