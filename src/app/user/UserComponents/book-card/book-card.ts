import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-card',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  @Input() book: any;

  constructor(private router: Router) {}

  handleViewDetails() {

    this.router.navigate([
      '/user/books',
      this.book.id
    ]);

  }

  get isAvailable(): boolean {

    return this.book.availableCopies > 0;

  }
}
