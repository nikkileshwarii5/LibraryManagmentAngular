import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { getStatusColor } from '../get-status-color'
import { getTimeRemaining } from '../get-time-remaining'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationService } from '../../../services/reservation.service';


@Component({
  selector: 'app-reservation-card',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reservation-card.html',
  styleUrl: './reservation-card.css',
})

export class ReservationCard {
 cancelDialogOpen = false;

  constructor(private router: Router, private reservationService: ReservationService) {}
  @Input() reservation: any;

  getStatusColor = getStatusColor;

  getTimeRemaining = getTimeRemaining;

  checkoutBook() {
  this.router.navigate(['/user/books', this.reservation.bookId]);
}

cancelReservation() {

  if (!confirm('Are you sure you want to cancel this reservation?')) {
    return;
  }

  this.reservationService
      .cancelReservation(this.reservation.id)
      .subscribe({

        next: () => {

          alert('Reservation cancelled successfully');

          // Refresh page
          window.location.reload();

        },

        error: (err) => {

          console.error(err);

          alert('Unable to cancel reservation');

        }

      });

}





openCancelDialog() {
  this.cancelDialogOpen = true;
}

confirmCancel() {

  this.reservationService
      .cancelReservation(this.reservation.id)
      .subscribe({

        next: () => {

          this.cancelDialogOpen = false;

          window.location.reload();

        },

        error: () => {

          this.cancelDialogOpen = false;

          alert('Unable to cancel reservation');

        }

      });

}

}

