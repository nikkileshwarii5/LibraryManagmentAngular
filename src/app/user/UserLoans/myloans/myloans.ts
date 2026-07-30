import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookLoanService } from '../../../services/book-loan.service';
import { EmptyState } from '../EmptyState/empty-state/empty-state';
import { tabs } from '../../../tabs/tabs'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoanCard } from '../loan-card/loan-card';
import { LoanBadgeService } from '../../../services/loan-state.service';

@Component({
  selector: 'app-myloans',
  standalone:true,
  imports: [FormsModule,CommonModule,LoanCard,EmptyState],
  templateUrl: './myloans.html',
  styleUrl: './myloans.css',
})
export class Myloans implements OnInit{
  myLoans: any[] = [];

  loading = false;

  error: any = null;

  totalElements = 0;

  totalPages = 0;

  activeTab = 0;

  tabs = tabs;

  snackbar = {
    open: false,
    message: '',
    severity: 'success'
  };

  paymentDialog = {
    open: false,
    loan: null as any
  };

  currentPage = 1;

  itemsPerPage = 10;

  constructor(
    private bookLoanService: BookLoanService,private cdr: ChangeDetectorRef,private loanBadgeService: LoanBadgeService
  ) {}

  ngOnInit(): void {

      this.loanBadgeService.setShowBadge(false);

    this.loadLoans();

  }

  // loadLoans(): void {

  //   this.loading = true;

  //   const status = this.tabs[this.activeTab].value;

  //   this.bookLoanService
  //     .fetchMyBookLoans(
  //       status,
  //       this.currentPage - 1,
  //       this.itemsPerPage
  //     )
  //     .subscribe({

  //       next: (res: any) => {

  //         this.loading = false;

  //         this.myLoans =
  //           res?.content || [];

  //         this.totalElements =
  //           res?.totalElements || 0;

  //         this.totalPages =
  //           res?.totalPages || 0;
  //           this.cdr.detectChanges();

  //       },

  //       error: (err) => {

  //         this.loading = false;

  //         this.error =
  //           err?.error?.message ||
  //           'Failed to load loans';

  //           this.cdr.detectChanges();

  //       }

  //     });

  // }


  loadLoans(): void {

  this.loading = true;

  const selectedStatus = this.tabs[this.activeTab].value;

  // Don't send ACTIVE to backend
  let status = selectedStatus === 'ACTIVE' ? null : selectedStatus;

  this.bookLoanService
    .fetchMyBookLoans(
      status,
      this.currentPage - 1,
      this.itemsPerPage
    )
    .subscribe({

      next: (res: any) => {

        this.loading = false;

        let loans = res?.content || [];

        // Active tab = Checked Out + Return Requested
        if (selectedStatus === 'ACTIVE') {

          loans = loans.filter(
            (loan: any) =>
              loan.status === 'CHECKED_OUT' ||
              loan.status === 'RETURN_REQUESTED'
          );

        }

        this.myLoans = loans;

        this.totalElements = loans.length;

        this.totalPages = res?.totalPages || 0;

        this.cdr.detectChanges();

      },

      error: (err) => {

        this.loading = false;

        this.error =
          err?.error?.message ||
          'Failed to load loans';

        this.cdr.detectChanges();

      }

    });

}


  handleTabChange(index: number): void {

  this.activeTab = index;

  this.currentPage = 1;

  // Show badge only for Overdue tab
  this.loanBadgeService.setShowBadge(
    this.tabs[index].value === 'OVERDUE'
  );

  this.loadLoans();
}



  handleRenewLoan(loanId: number): void {

  this.bookLoanService
    .renew({
      bookLoanId: loanId
    })
    .subscribe({

      next: () => {

        this.showSnackbar(
          'Book renewed successfully! Due date extended.',
          'success'
        );

        this.loadLoans();

      },

      error: (err) => {

        console.log(err);

        this.showSnackbar(
          err?.error?.message ||
          'Failed to renew book',
          'error'
        );

      }

    });

}

  handlePayFine(loan: any): void {

    this.paymentDialog = {
      open: true,
      loan
    };

  }

  confirmPayment(): void {

    const body = {
      loanId: this.paymentDialog.loan.id,
      amount: this.paymentDialog.loan.fineAmount
    };

    this.bookLoanService
      .createFine(body)
      .subscribe({

        next: () => {

          this.showSnackbar(
            `Fine of ₹${this.paymentDialog.loan.fineAmount.toFixed(2)} paid successfully!`,
            'success'
          );

          this.paymentDialog = {
            open: false,
            loan: null
          };

          this.loadLoans();

        },

        error: (err) => {

          this.showSnackbar(
            err?.error?.message ||
            'Failed to process payment',
            'error'
          );

        }

      });

  }

  handleReturnBook(loanId: number): void {

    // this.bookLoanService
    //   .checkin({
    //     bookLoanId: loanId
    //   })

    this.bookLoanService.requestReturn({
    bookLoanId: loanId
})

      .subscribe({

        next: () => {

          this.showSnackbar(
            'Return request submitted.Waiting for librarian approval!',
            'success'
          );

          this.loadLoans();

        },

        error: (err) => {

          this.showSnackbar(
            err?.error?.message ||
            'Failed to process return',
            'error'
          );

        }

      });

  }

  showSnackbar(
    message: string,
    severity: string = 'success'
  ): void {

    this.snackbar = {
      open: true,
      message,
      severity
    };

    setTimeout(() => {

      this.handleCloseSnackbar();

    }, 4000);

  }

  handleCloseSnackbar(): void {

    this.snackbar.open = false;

  }

  get sortedLoans(): any[] {

    return [...this.myLoans].sort((a, b) => {

      if (a.isOverdue && !b.isOverdue) {

        return -1;

      }

      if (!a.isOverdue && b.isOverdue) {

        return 1;

      }

      return (
        new Date(a.dueDate).getTime() -
        new Date(b.dueDate).getTime()
      );

    });

  }

  onPageChange(page: number): void {

    this.currentPage = page;

    this.loadLoans();

  }

  onItemsPerPageChange(event: any): void {

    this.itemsPerPage = +event.target.value;

    this.currentPage = 1;

    this.loadLoans();

  }


  handleReportLost(loanId: number): void {

  if (!confirm(
      'Are you sure you want to report this book as lost?')) {
    return;
  }

  this.bookLoanService
      .reportLost({
          bookLoanId: loanId
      })
      .subscribe({

        next: () => {

          this.showSnackbar(
            'Book reported as lost. Library staff will review your request.',
            'success'
          );

          this.loadLoans();

        },

        error: (err) => {

          this.showSnackbar(
            err?.error?.message ||
            'Failed to report lost book',
            'error'
          );

        }

      });

}
}
