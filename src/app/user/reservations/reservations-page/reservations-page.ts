import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationTabs } from '../reservation-tabs/reservation-tabs';
import { ReservationStats } from '../reservation-stats/reservation-stats';
import { ReservationCard } from '../reservation-card/reservation-card';
import { EmptyState } from '../empty-state/empty-state';
import { CreateDialog } from '../create-dialog/create-dialog';
import { SnackbarAlert } from '../snackbar-alert/snackbar-alert';
import { ReservationService } from '../../../services/reservation.service'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservations-page',
  standalone:true,
  imports: [CommonModule,FormsModule,ReservationCard,ReservationStats,ReservationTabs,EmptyState,CreateDialog,SnackbarAlert],
  templateUrl: './reservations-page.html',
  styleUrl: './reservations-page.css',
})
export class ReservationsPage  implements OnInit {
   activeTab = 0;

  filterStatus = '';

  createDialogOpen = false;

  loading = false;

  bookId = '';

  reservations: any[] = [];

  snackbar = {
    open: false,
    message: '',
    severity: 'success',
  };

  constructor(
    private reservationService: ReservationService,  private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadReservations();

  }



  loadReservations() {

  this.loading = true;

  this.reservationService
    .getMyReservations()
    .subscribe({

      next: (response: any) => {

        this.reservations =
          response.content || response || [];

        // Apply filters on frontend
        if (this.filterStatus) {
          this.reservations = this.reservations.filter(
            (r: any) => r.status === this.filterStatus
          );
        }

        if (this.activeTab === 1) {
          this.reservations = this.reservations.filter(
            (r: any) =>
              r.status === 'PENDING' ||
              r.status === 'AVAILABLE'
          );
        }

        if (this.activeTab === 2) {
          this.reservations = this.reservations.filter(
            (r: any) =>
              r.status === 'FULFILLED' ||
              r.status === 'CANCELLED' ||
              r.status === 'EXPIRED'
          );
        }

        this.loading = false;
        this.cdr.detectChanges();
      },

      error: () => {

        this.loading = false;
        this.cdr.detectChanges();

        this.showSnackbar(
          'Failed to load reservations',
          'error'
        );

      }

    });

}

  onTabChange(index: number) {

    this.activeTab = index;

    this.loadReservations();

  }

  handleCreateReservation() {

 
  if (
    this.bookId === null ||
    this.bookId === undefined ||
    this.bookId === ''
  ) {

    this.showSnackbar(
      'Please enter Book ID',
      'warning'
    );

    return;

  }

    this.showSnackbar(
      'Reservation created successfully',
      'success'
    );

    this.createDialogOpen = false;

    this.bookId = '';

  }

  cancelReservation(id: number) {

    this.reservationService
      .cancelReservation(id)
      .subscribe({

        next: () => {

          this.showSnackbar(
            'Reservation cancelled successfully',
            'success'
          );

          this.loadReservations();

        },

        error: () => {

          this.showSnackbar(
            'Failed to cancel reservation',
            'error'
          );

        }

      });

  }

  fulfillReservation(id: number) {

    this.reservationService
      .fulfillReservation(id)
      .subscribe({

        next: () => {

          this.showSnackbar(
            'Reservation fulfilled successfully',
            'success'
          );

          this.loadReservations();

        },

        error: () => {

          this.showSnackbar(
            'Failed to fulfill reservation',
            'error'
          );

        }

      });

  }

  get stats() {

    return {

      total: this.reservations.length,

      active: this.reservations.filter(
        (r: any) =>
          ['PENDING', 'AVAILABLE']
            .includes(r.status)
      ).length,

      available: this.reservations.filter(
        (r: any) =>
          r.status === 'AVAILABLE'
      ).length,

    };

  }

  showSnackbar(
    message: string,
    severity: string
  ) {

    this.snackbar = {

      open: true,

      message,

      severity,

    };

    setTimeout(() => {

      this.snackbar.open = false;

    }, 4000);

  }
}
