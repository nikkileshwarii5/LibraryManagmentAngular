import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Statscard } from '../components/statscard/statscard';
import { DashboardService } from '../../services/Dashboard.Service';
import { ChangeDetectorRef } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ReservationService } from '../../services/reservation.service';
import { SubscriptionPlanService } from '../../services/subscriptionPlan.service';
import { BookLoanService } from '../../services/book-loan.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, Statscard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  stats: any = {};   // 🔥 remove hardcoded values

  isLoading = true;  // start loading

  recentActivities: any[] = [];

  constructor(private dashboardService: DashboardService ,private cdr: ChangeDetectorRef,private paymentService: PaymentService,  private loanService: BookLoanService,
  private reservationService: ReservationService,
  private subscriptionService: SubscriptionPlanService,) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentActivities();
  }
loadStats() {
  this.dashboardService.getStats().subscribe({
    next: (res) => {
      this.stats = res;


      // Load monthly revenue
  this.paymentService.getMonthlyRevenue().subscribe({
    next: (res: any) => {

      console.log("Monthly Revenue:", res);

      this.stats.monthlyRevenue = res.monthlyRevenue;

      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error("Revenue Error:", err);
    }
  });
      
      this.isLoading = false;

      this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
    },
    error: (err) => {
      console.error("Error loading dashboard:", err);
      this.isLoading = false;
    }
  });

  
}

  getBadgeClass(type: string) {
    switch (type) {
      case 'loan': return 'bg-primary';
      case 'reservation': return 'bg-info';
      case 'subscription': return 'bg-warning';
      case 'review': return 'bg-success';
      default: return 'bg-secondary';
    }
  }

  getActivityIcon(type: string) {
    const map: any = {
      loan: 'bi bi-calendar-check',
      review: 'bi bi-star',
      subscription: 'bi bi-person-badge',
      reservation: 'bi bi-bookmark-check'
    };
    return map[type] || 'bi bi-book';
  }



  getActivityColor(type: string) {
  switch (type) {
    case 'loan':
      return 'primary';
    case 'review':
      return 'success';
    case 'subscription':
      return 'warning';
    case 'reservation':
      return 'purple'; // custom
    default:
      return 'secondary';
  }
}

  loadRecentActivities() {

  this.recentActivities = [];

  // ================= Loans =================
  this.loanService.getAllLoans({
    page: 0,
    size: 2,
    sortBy: 'checkoutDate',
    sortDirection: 'DESC'
  }).subscribe({

    next: (res: any) => {

      res.content?.forEach((loan: any) => {

        this.recentActivities.push({

          type: 'loan',
          user: loan.userName,
          action: 'borrowed',
          book: loan.bookTitle,
          time: this.getTimeAgo(loan.createdAt),
          timestamp: new Date(loan.createdAt)

        });

      });

      this.sortActivities();

    }

  });


  // ================= Reservations =================

  this.reservationService.searchReservations({

    activeOnly: true,
    page: 0,
    size: 2

  }).subscribe({

    next: (res: any) => {


      res.content?.forEach((reservation: any) => {
      console.log("Reservation:", reservation);



        this.recentActivities.push({

       
          type: 'reservation',
          user: reservation.userName,
          action: 'reserved',
          book: reservation.bookTitle,
          time: this.getTimeAgo(reservation.reservedAt),
          timestamp: new Date(reservation.reservedAt)

        });

      });

      this.sortActivities();

    }

  });


  // ================= Subscriptions =================

  this.subscriptionService.fetchAllActiveSubscriptions(0,2)

  .subscribe({

    next: (res: any) => {

      res.forEach((subscription: any) => {

        this.recentActivities.push({

          type: 'subscription',
          user: subscription.userName,
          action: 'subscribed to',
          book: subscription.planName,
          time: this.getTimeAgo(subscription.createdAt),
          timestamp: new Date(subscription.createdAt)

        });

      });

      this.sortActivities();

    }

  });

}
sortActivities() {

  this.recentActivities = this.recentActivities
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 10);

  this.cdr.detectChanges();

}

getTimeAgo(dateString: string): string {

  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();

  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) {
    return 'Just now';
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);

  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}
}