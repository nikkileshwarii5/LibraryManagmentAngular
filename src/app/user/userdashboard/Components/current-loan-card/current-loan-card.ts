import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-current-loan-card',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './current-loan-card.html',
  styleUrl: './current-loan-card.css',
})
export class CurrentLoanCard {
   @Input() loan: any;

  constructor(private router: Router) {}

  navigateToBook(id: number) {

    this.router.navigate(['/user/books', id]);

  }

  getDaysRemainingColor(days: number) {

    if (days < 0) return 'danger-chip';

    if (days <= 3) return 'warning-chip';

    return 'success-chip';

  }
}
