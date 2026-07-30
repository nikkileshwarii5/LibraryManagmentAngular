import { ChangeDetectorRef, Component } from '@angular/core';
import { TestimonialService } from '../../services/TestimonialService';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-addtestimonals',
  standalone: true,
  imports: [FormsModule,CommonModule],   // ✅ REQUIRED for ngModel
  templateUrl: './addtestimonals.html',
  styleUrls: ['./addtestimonals.css'],
})
export class Addtestimonals {

  constructor(private service: TestimonialService, private router : Router,private cdr: ChangeDetectorRef) {}  // ✅ INJECT
stars = [1, 2, 3, 4, 5];
  form = {
    name: '',
    role: '',
    text: '',
    rating:0,
    image: '👤'
  };
  setRating(value: number) {
  this.form.rating = value;
  this.cdr.detectChanges();
}
  submit() {
    this.service.add(this.form).subscribe({
      next: () => {
        alert('Added successfully');
        this.cdr.detectChanges();
        this.router.navigate(['/']);   // ✅ redirect
      },
      error: () => {
        alert('Error adding testimonial');
       this.cdr.detectChanges();
    }
  });
  }

}
