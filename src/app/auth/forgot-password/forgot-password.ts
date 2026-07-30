import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  standalone: true, // ✅ REQUIRED
  imports: [ReactiveFormsModule,CommonModule,RouterLink], // ✅ REQUIRED
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css'], // ✅ FIXED
})
export class ForgotPassword {
loading = false;
  error: string | null = null;
  success = false;

  email = '';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,private cdr: ChangeDetectorRef
  ) {

    this.form = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ]
    });
  }

  get emailControl() {
    return this.form.get('email');
  }

  onSubmit() {

     console.log('Submit clicked');
    this.error = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.email = this.form.value.email;

    this.loading = true;

    this.authService.forgotPassword(this.email).subscribe({
      next: (res) => {
        console.log(res);
        this.loading = false;
        this.success = true;
         this.cdr.detectChanges();
        console.log('Success:', this.success);
      },
      error: (err) => {
        this.loading = false;
        this.error =err || 'Failed to send reset link';
         this.cdr.detectChanges();
      }
    });
  }
}