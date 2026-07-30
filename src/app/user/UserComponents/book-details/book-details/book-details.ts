import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import { BookService }from '../../../../services/book.service';
import { CheckoutDialog } from '../../CheckoutDialog/checkout-dialog/checkout-dialog';
import { ReservationDialog } from '../../ReservationDialog/reservation-dialog/reservation-dialog';
import { ReviewDialog } from '../../ReviewDialog/review-dialog/review-dialog';
import { SubscriptionPlanService } from '../../../../services/subscriptionPlan.service';
import { BookLoanService } from '../../../../services/book-loan.service';
import { WishlistService } from '../../../../services/WishlistService';
import { ReviewService } from '../../../../services/ReviewService';
import { ReservationService } from '../../../../services/reservation.service';
@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule,FormsModule,ReviewDialog,ReservationDialog,CheckoutDialog],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css'
})
export class BookDetails
implements OnInit {

  bookId!: number;
  book: any = null;
  relatedBooks: any[] = [];
  reviews: any[] = [];
  loading = false;
  reviewsLoading = false;
  bookActivity: any = null;
  canReview = false;
  isEditingReview = false;
  userReview: any = null;
  error: string | null = null;
  activeTab = 0;


  snackbar = {
    open: false,
    message: '',
    severity: 'success'
  };

  checkoutDialog = {
    open: false,
    loading: false
  };

  reservationDialog = {
    open: false,
    loading: false
  };

  reviewDialog = {
    open: false,
    loading: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private cdr: ChangeDetectorRef,
    private subscriptionService : SubscriptionPlanService,
    private bookLoanService : BookLoanService,
    private whishlistService : WishlistService,
    private reviewService: ReviewService,
    private reservationService: ReservationService
  
) {}


  ngOnInit(): void {

    this.bookId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadBookDetails();

  

  }

  loadBookDetails() {

    this.loading = true;
    this.cdr.detectChanges();

    this.bookService
      .getBookById(this.bookId)
      .subscribe({

        next: (res: any) => {

          this.book = res;
          this.loadReviewPermission();
          this.loadBookActivity();

          this.loadReviews();
          this.loadUserReview();
          this.loadRatingStats();

          this.loading = false;
          this.cdr.detectChanges();
          this.loadRelatedBooks();

        },

        error: (err) => {

          this.error =
            err?.error?.message ||
            'Book not found';

          this.loading = false;
          this.cdr.detectChanges();

        }

      });

  }

  loadRelatedBooks() {

    if (!this.book?.genreId) {

      return;

    }

    this.bookService
      .getBooks({

        genreId: this.book.genreId,
        page: 0,
        size: 5,
        sortBy: 'createdAt',
        sortDirection: 'DESC'

      })
      .subscribe({

        next: (res: any) => {

          this.relatedBooks =
            res?.content || res;

        }

      });

  }

  get isAvailable(): boolean {

    return (
      this.book?.availableCopies > 0
    );

  }

  goBack() {

    this.router.navigate([
      '/user/books'
    ]);

  }

  setTab(index: number) {

    this.activeTab = index;

  }


handleOpenCheckout() {

  const loginData = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const userId = loginData?.user?.id;

  this.subscriptionService
    .checkValidSubscription(userId)
    .subscribe({

      next: (response: any) => {

        console.log(response);

        if (response.status) {

          this.checkoutDialog.open = true;

        } else {

          this.router.navigate(['/user/subscriptions']);

        }

      },

      error: (err) => {

        console.log(err);

        this.router.navigate(['/user/subscriptions']);

      }

    });
}


  handleCloseCheckout() {

    this.checkoutDialog = {
      open: false,
      loading: false
    };

  }

  handleOpenReservation() {

  console.log('Reserve clicked');

  this.reservationDialog = {
    open: true,
    loading: false
  };

}

  handleCloseReservation() {

    this.reservationDialog = {
      open: false,
      loading: false
    };

  }




handleOpenReview() {

  if (!this.canReview) {
    return;
  }

  this.isEditingReview = false;

  this.reviewDialog.open = true;

}

  handleCloseReview() {

    this.reviewDialog = {
      open: false,
      loading: false
    };

  }



handleWishlist(): void {
  if (!this.book) return;

  this.whishlistService.addToWishlist(this.book.id).subscribe({
    next: () => {
      this.showSnackbar(
        'Book added to wishlist',
        'success'
      );
    },
    error: (err) => {

      const message = err?.error?.message || '';

      if (
        message.includes('already') ||
        message.includes('exists')
      ) {
        this.showSnackbar(
          'Already added to wishlist',
          'success'
        );
      } else {
        this.showSnackbar(
          'Failed to add to wishlist',
          'error'
        );
      }
    }
  });
}

  handleShare() {

    navigator.clipboard.writeText(
      window.location.href
    );

    this.showSnackbar(
      'Link copied',
      'success'
    );

  }

  handlePrint() {

    window.print();

  }

  showSnackbar(message: string, severity: 'success' | 'error') {

    this.snackbar = {
      open: true,
      message,
      severity
    };

    this.cdr.detectChanges();

    setTimeout(() => {

      this.snackbar.open = false;
      this.cdr.detectChanges();

    }, 3000);

  }

  calculateAverageRating(): string {

    if (
      !this.reviews ||
      this.reviews.length === 0
    ) {

      return '0';

    }

    const total =
      this.reviews.reduce(
        (sum, review) =>
          sum + review.rating,
        0
      );

    return (
      total / this.reviews.length
    ).toFixed(1);

  }



  handleConfirmCheckout(request: any) {

  this.checkoutDialog.loading = true;

  this.bookLoanService .checkoutBook(request).subscribe({

      next: (response: any) => {

        // Remove from wishlist if present
  this.whishlistService
      .removeFromWishlist(this.book.id)
      .subscribe({
        next: () => {
          console.log('Removed from wishlist');
        },
        error: () => {
          // Ignore error if the book wasn't in the wishlist
        }
      });

        // Success notification
        this.showSnackbar(
          'Book borrowed! View it in My Loans.',
          'success'
        );

        // Close dialog
        this.handleCloseCheckout();

        // Reload book details
        this.loadBookDetails();

        // Navigate after 2 seconds
        setTimeout(() => {

          this.router.navigate([
            '/user/loans'
          ]);

        }, 2000);

      },

      error: (err) => {

        this.checkoutDialog.loading = false;

        this.showSnackbar(
          err?.error?.message ||
          'Unable to checkout this book.',
          'error'
        );

      }

    });

}

loadReviewPermission() {

  if (!this.book?.id) {
    return;
  }

  this.reviewService
    .checkCanReview(this.book.id)
    .subscribe({

      next: (res: any) => {

        console.log('can review response', res);

        this.canReview = res.canReview;

        console.log('canReview=', this.canReview);
      },

      error: (err) => {

        console.log(err);

        this.canReview = false;
      }
    });
}


handleSubmitReview(reviewData: any) {

  this.reviewDialog.loading = true;

  if (this.isEditingReview) {

    this.reviewService
      .updateReview(
        this.userReview.id,
        reviewData
      )
      .subscribe({

        next: () => {

          this.canReview = false;
          this.showSnackbar(
            'Review updated successfully',
            'success'
          );

          this.reviewDialog = {
            open: false,
            loading: false
          };

          this.isEditingReview = false;

          this.loadReviews();
          this.loadUserReview();

          this.cdr.detectChanges();

        },

        error: (err) => {

          this.reviewDialog.loading = false;

          this.showSnackbar(
            err?.error?.message ||
            'Failed to update review',
            'error'
          );

        }

      });

  } else {

    this.reviewService
      .createReview({
        ...reviewData,
        bookId: this.bookId
      })
      .subscribe({

        next: () => {

          this.canReview = false;

          this.showSnackbar(
            'Thank you for your review!',
            'success'
          );

          this.reviewDialog = {
            open: false,
            loading: false
          };

          this.loadReviews();
          this.loadUserReview();

          this.cdr.detectChanges();

        },

        error: (err) => {

          this.reviewDialog.loading = false;

          this.showSnackbar(
            err?.error?.message ||
            'Failed to submit review',
            'error'
          );

        }

      });

  }

}




loadReviews() {

  this.reviewsLoading = true;

  this.reviewService
    .getReviews(this.bookId)
    .subscribe({

      next: (res: any) => {

        this.reviews =
          res.content || res || [];

        this.reviewsLoading = false;

        this.cdr.detectChanges();

        console.log(
          'Reviews Array:',
          this.reviews
        );

      },

      error: () => {

        this.reviewsLoading = false;

        this.cdr.detectChanges();

      }

    });

}


loadRatingStats() {

  this.reviewService
    .getRatingStatistics(this.bookId)
    .subscribe({
      next: (res) => {
        console.log(res);
      }
    });

}


loadUserReview() {

  this.reviewService
    .getMyReviews()
    .subscribe({
      next: (res: any) => {

        const reviews =
          res.content || res || [];

        this.userReview =
          reviews.find(
            (r: any) =>
              Number(r.bookId) === Number(this.bookId)
          );

        // If review exists, don't allow Write Review
        if (this.userReview) {

          this.canReview = false;

        } else {

          // If no review exists, check whether user can review
          this.loadReviewPermission();

        }

        this.cdr.detectChanges();

      }
    });

}


handleConfirmReservation(request: any) {

  this.reservationDialog.loading = true;

  this.reservationService
    .createReservation(request)
    .subscribe({

      next: (response: any) => {

        this.showSnackbar(
          'Book reserved! View it in My Reservations.',
          'success'
        );

        this.handleCloseReservation();

        this.loadBookDetails();

        setTimeout(() => {

          this.router.navigate(['/user/reservations']);

        }, 2000);

      },

      error: (err) => {

        this.reservationDialog.loading = false;

        this.showSnackbar(
          err?.error?.message ||
          'Failed to reserve book',
          'error'
        );

      }

    });

}


loadBookActivity(): void {

  if (!this.book?.id) {
    return;
  }

  this.bookLoanService 
    .getBookActivity(this.book.id)
    .subscribe({

      next: (res) => {
         console.log('Book Activity:', res);
        this.bookActivity = res;
      },

      error: (err) => {
        console.error(
          'Failed to load activity',
          err
        );
      }

    });

}


handleEditReview(): void {

  this.isEditingReview = true;

  this.reviewDialog.open = true;

}


handleDeleteReview(): void {

  if (!this.userReview?.id) {
    return;
  }

  this.reviewService
    .deleteReview(
      this.userReview.id
    )
    .subscribe({

      next: () => {

        this.showSnackbar(
          'Review deleted successfully',
          'success'
        );

        this.userReview = null;

          this.canReview = true;

        this.loadReviews();

      },

      error: (err) => {

        this.showSnackbar(
          err?.error?.message ||
          'Failed to delete review',
          'error'
        );

      }

    });

}




}