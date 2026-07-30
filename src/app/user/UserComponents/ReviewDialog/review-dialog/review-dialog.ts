import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './review-dialog.html',
  styleUrl: './review-dialog.css'
})
export class ReviewDialog {

  @Input() open = false;

  @Input() loading = false;

  @Input() book: any;

  @Input() existingReview: any = null;

  @Output() close =
    new EventEmitter<void>();

  @Output() submitReview =
    new EventEmitter<any>();

  rating = 0;

  hoverRating = -1;

  comment = '';

  error = '';

  ratingLabels: any = {

    1: 'Poor',

    2: 'Fair',

    3: 'Good',

    4: 'Very Good',

    5: 'Excellent'

  };

  ngOnInit() {

    this.resetValues();

  }

  resetValues() {

    this.rating =
      this.existingReview?.rating || 0;

    this.comment =
      this.existingReview?.comment || '';

  }

  setRating(value: number) {

    if (!this.loading) {

      this.rating = value;

      this.error = '';

    }

  }

  handleSubmit() {

    if (this.rating === 0) {

      this.error =
        'Please select a rating';

      return;

    }

    if (!this.comment.trim()) {

      this.error =
        'Please write a review';

      return;

    }

    if (
      this.comment.trim().length < 10
    ) {

      this.error =
        'Review must be at least 10 characters long';

      return;

    }

    if (
      this.comment.trim().length > 1000
    ) {

      this.error =
        'Review must not exceed 1000 characters';

      return;

    }

    this.error = '';

    this.submitReview.emit({

  bookId: this.book.id,

  rating: this.rating,

  reviewText: this.comment.trim()

});

  }

  handleClose() {

    if (!this.loading) {

      this.resetValues();

      this.error = '';

      this.close.emit();

    }

  }

  getRatingText() {

    return (
      this.ratingLabels[
        this.hoverRating !== -1
          ? this.hoverRating
          : this.rating
      ] || 'No Rating'
    );

  }

}