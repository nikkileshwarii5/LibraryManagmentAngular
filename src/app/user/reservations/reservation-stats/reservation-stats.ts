import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-stats',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reservation-stats.html',
  styleUrl: './reservation-stats.css',
})
export class ReservationStats {
   @Input() stats: any;
}
