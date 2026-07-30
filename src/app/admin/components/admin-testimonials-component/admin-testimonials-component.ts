import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialService } from '../../../services/TestimonialService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-testimonials-component',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-testimonials-component.html',
  styleUrl: './admin-testimonials-component.css',
})
export class AdminTestimonialsComponent implements OnInit{

   testimonials: any[] = [];
   pendingCount = 0;
approvedCount = 0;
rejectedCount = 0;

  constructor(private service: TestimonialService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTestimonials();
  }



 

  loadTestimonials() {
  this.service.getAllTestimonials().subscribe({
    next: (res) => {
      console.log("Testimonials:", res);

      this.testimonials = [...res];

      this.pendingCount =
        this.testimonials.filter(t => t.status === 'PENDING').length;

      this.approvedCount =
        this.testimonials.filter(t => t.status === 'APPROVED').length;

      this.rejectedCount =
        this.testimonials.filter(t => t.status === 'REJECTED').length;

      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error(err);
    }
  });
}

  approve(id: number) {
    this.service.approve(id).subscribe(() => {
      this.loadTestimonials();
    });
  }

  reject(id: number) {
    this.service.reject(id).subscribe(() => {
      this.loadTestimonials();
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => {
      this.loadTestimonials();
    });
  }
}
