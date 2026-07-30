import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Console } from 'console';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ IMPORTANT
  imports: [
  ReactiveFormsModule,
  CommonModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  RouterModule

], // ✅ REQUIRED
  templateUrl: './login.html',
  styleUrls: ['./login.css'], // ✅ correct property (styleUrls not styleUrl)
})
export class Login {

  loading = false;
  error: string | null = null;
  showPassword = false;

  loginForm!: FormGroup; // ✅ declare first

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // ✅ initialize inside constructor
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // onSubmit() {
  //   if (this.loginForm.invalid) return;

  //   this.loading = true;

  //   this.authService.login(this.loginForm.value).subscribe({
  //     next: (res) => {
  //       this.loading = false;

  //       const role = res.user?.role;

  //       if (role === 'ROLE_ADMIN' || role === 'ADMIN') {
  //         this.router.navigate(['/dashboard']);
  //       } else {
  //         this.router.navigate(['/']);
  //       }
  //     },
  //     error: (err) => {
  //       this.loading = false;
  //       this.error = err;
  //     }
  //   });
  // }

  onSubmit() {
  if (this.loginForm.invalid) return;

  this.loading = true;

  console.log("Submitting login...");

  this.authService.login(this.loginForm.value).subscribe({
    next: (res) => {
      console.log("SUCCESS RESPONSE:", res);  // 👈 MUST PRINT
      this.loading = false;

      const role = res.user?.user?.role;
      console.log("ROLE:", role);

      if (role === 'ROLE_ADMIN') {
        console.log("Navigating to admin dashboard...");
        this.router.navigate(['/admin/dashboard']);
      } 
      else if(role === 'ROLE_USER'){
        console.log("Navigating to user dashboard....");
        this.router.navigate(['/user/dashboard']);
      }
      else {
        this.router.navigate(['/']);
      }
    },
    error: (err) => {
      console.log("ERROR:", err);  // 👈 CHECK THIS
      this.loading = false;
      this.error = err;
    }
  });
}
  loginWithGoogle() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }
}