import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookLoanService } from '../../../services/book-loan.service';
import { CurrentLoans } from '../Components/current-loans/current-loans';
import { Reservation } from '../Components/reservation/reservation';
import { ReadingHistory } from '../Components/reading-history/reading-history';
import { Recommendation } from '../Components/recommendation/recommendation';
import { StatsCard } from '../Components/stats-card/stats-card';
import { statsConfig } from '../../../services/stats-config';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrentLoans,
    Reservation,
    ReadingHistory,
    Recommendation,
    StatsCard
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  activeTab = 0;

  myLoans: any[] = [];

  reservations: any[] = [];

  myReservations: any[] = [];

  stats: any = {
    currentLoans: 0,
    activeReservations: 0,
    booksRead: 0,
    readingStreak: 0,
  };

  currentYear = new Date().getFullYear();

  constructor(
    private loanService: BookLoanService,private cdr: ChangeDetectorRef,  private reservationService: ReservationService
  ) {}

  ngOnInit(): void {

    this.loadLoans();

    this.loadDashboardStats();

    this.loadReservations();

  }

  loadLoans() {

    this.loanService.fetchMyBookLoans().subscribe({

      next: (res: any) => {

        this.myLoans = res?.content || [];
         this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  loadDashboardStats() {

    this.loanService.fetchDashboardStats().subscribe({

      next: (res: any) => {

        this.stats = res;
         this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }



  get readingProgress(): number {
  return this.stats.totalBooks > 0
    ? (this.stats.booksRead / this.stats.totalBooks) * 100
    : 0;
}

  get statsData() {

    return statsConfig({
      myLoans: this.myLoans,
      reservations: this.myReservations,
      stats: this.stats
    });

  }




  loadReservations() {

  this.reservationService
    .getMyReservations()
    .subscribe({

      next: (res: any) => {

        console.log('Reservations:', res);

        this.myReservations =
          res.content || [];

      },

      error: (err) => {

        console.error(err);

      }

    });

}
}