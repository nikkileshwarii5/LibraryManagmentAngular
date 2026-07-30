import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loan-card',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './loan-card.html',
  styleUrl: './loan-card.css',
})
export class LoanCard {
  @Input() loan: any;

  @Output() renew = new EventEmitter<number>();
  @Output() payFine = new EventEmitter<any>();
  @Output() returnBook = new EventEmitter<number>();
  @Output() reportLost = new EventEmitter<number>();

  constructor(private router: Router) {}



canRenew(): boolean {

  return (
    this.loan.status === 'CHECKED_OUT' &&
    this.loan.renewalCount < this.loan.maxRenewals &&
    !this.loan.isOverdue &&
    (
      this.loan.fineAmount == null ||
      this.loan.fineAmount === 0 ||
      this.loan.finePaid
    )
  );

}

onReportLost() {

    this.reportLost.emit(this.loan.id);

}


  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  getStatusConfig() {
    if (this.loan.returnDate) {
      return {
        label: 'Returned',
        icon: 'bi bi-check-circle-fill',
        color: '#10B981',
        bgColor: 'rgba(16, 185, 129, 0.1)',
      };
    }

    if (this.loan.isOverdue) {
      return {
        label: `Overdue (${this.loan.overdueDays} days)`,
        icon: 'bi bi-exclamation-triangle-fill',
        color: '#EF4444',
        bgColor: 'rgba(239, 68, 68, 0.1)',
      };
    }

    if (this.loan.status === 'CHECKED_OUT') {
      return {
        label: 'Checked Out',
        icon: 'bi bi-check-circle-fill',
        color: '#3B82F6',
        bgColor: 'rgba(59, 130, 246, 0.1)',
      };
    }


    // 👇 ADD THIS
if (this.loan.status === 'RETURN_REQUESTED') {
  return {
    label: 'Return Requested',
    icon: 'bi bi-hourglass-split',
    color: '#F59E0B',
    bgColor: 'rgba(245,158,11,0.1)',
  };
}

// 👇 ADD THIS (for future use)
if (this.loan.status === 'LOSS_REPORTED') {
  return {
    label: 'Loss Reported',
    icon: 'bi bi-exclamation-octagon-fill',
    color: '#DC2626',
    bgColor: 'rgba(220,38,38,0.1)',
  };

}
    return {
      label: this.loan.status,
      icon: 'bi bi-clock-fill',
      color: '#6B7280',
      bgColor: 'rgba(107, 114, 128, 0.1)',
    };

  
    
  }

  getDueDateWarning(): number | null {

    if (this.loan.returnDate || this.loan.isOverdue) {
      return null;
    }

    const dueDate = new Date(this.loan.dueDate);
    const today = new Date();

    const diffTime = dueDate.getTime() - today.getTime();

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 3 && diffDays > 0) {
      return diffDays;
    }

    return null;
  }

  navigateToBook() {
    this.router.navigate(['/user/books', this.loan.bookId]);
  }

  onRenewBook() {
    this.renew.emit(this.loan.id);
  }

  onPayFineBook() {
    this.payFine.emit(this.loan);
  }

  onReturnBook() {
    this.returnBook.emit(this.loan.id);
  }
}
