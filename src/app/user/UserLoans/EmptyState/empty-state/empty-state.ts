import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
})
export class EmptyState {

  @Input() filterType: string = 'all';

  constructor(private router: Router) {}

  get content() {

    switch (this.filterType.toLowerCase()) {

      case 'active':
      case 'checked_out':
        return {
          icon: 'bi bi-hourglass-split',
          iconColor: '#9CA3AF',
          title: 'No Active Loans',
          message: "You don't have any books currently checked out.",
          buttonText: 'Browse Books',
        };

      case 'overdue':
        return {
          icon: 'bi bi-check-circle-fill',
          iconColor: '#10B981',
          title: 'Great Job!',
          message: "You don't have any overdue books. Keep up the good work!",
          buttonText: 'Browse More Books',
        };

      case 'returned':
        return {
          icon: 'bi bi-book',
          iconColor: '#9CA3AF',
          title: 'No Returned Books',
          message: "You haven't returned any books yet.",
          buttonText: 'Borrow Books',
        };

      default:
        return {
          icon: 'bi bi-book',
          iconColor: '#9CA3AF',
          title: 'No Books Found',
          message: "You haven't borrowed any books yet. Start exploring our collection!",
          buttonText: 'Browse Books',
        };
    }
  }

  navigateToBooks() {

    this.router.navigate(['/user/books']);

  }
}