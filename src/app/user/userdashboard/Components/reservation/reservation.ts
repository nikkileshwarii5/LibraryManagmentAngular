import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reservation.html',
  styleUrl: './reservation.css',
})
export class Reservation {
  @Input() reservations: any[] = [];

  constructor(private router: Router) {}

  navigateToBook(id: number) {

    this.router.navigate(['/user/books', id]);

  }
}
