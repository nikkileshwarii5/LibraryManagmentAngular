import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TestimonialService } from '../../services/TestimonialService';

@Component({
  selector: 'app-testimonals',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './testimonals.html',
  styleUrl: './testimonals.css',
})
export class Testimonals implements OnInit {



  testimonials: any[] = [];

  constructor(private service: TestimonialService,private cdr: ChangeDetectorRef) {}


  ngOnInit() {
    this.loadTestimonials();
  }

  loadTestimonials() {
   this.service.getApprovedTestimonials().subscribe({
      next: (res) => {
        this.testimonials = [...res];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
