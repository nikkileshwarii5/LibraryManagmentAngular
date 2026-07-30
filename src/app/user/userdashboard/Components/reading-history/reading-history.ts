import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookLoanService } from '../../../../services/book-loan.service'

@Component({
  selector: 'app-reading-history',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reading-history.html',
  styleUrl: './reading-history.css',
})
export class ReadingHistory {
   myLoans: any[] = [];

  constructor(
    private router: Router,
    private bookLoanService: BookLoanService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadLoans();

  }

  loadLoans() {

    const status = 'RETURNED';

    this.bookLoanService
      .fetchMyBookLoans(status, 0, 20)
      .subscribe({

       

        next: (res: any) => {
         this.myLoans = res?.content || [];
         this.cdr.detectChanges();

},

        error: (err) => {

          console.log(err);

        }

      });

  }

  navigateToBook(bookId: number) {

    this.router.navigate(['/user/books', bookId]);

  }

  getStars(rating: number): number[] {

    return Array(rating).fill(0);

  }
}
