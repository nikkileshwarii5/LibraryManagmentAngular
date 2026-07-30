import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './checkout-dialog.html',
  styleUrl: './checkout-dialog.css'
})
export class CheckoutDialog {

  @Input() open = false;

  @Input() loading = false;

  @Input() book: any;

  @Output() close =
    new EventEmitter<void>();

  @Output() confirm =
    new EventEmitter<any>();

  checkoutDays = 14;

  notes = '';

  error = '';

  checkoutOptions = [

    {
      value: 7,
      label: '1 Week (7 days)'
    },

    {
      value: 14,
      label: '2 Weeks (14 days)'
    },

    {
      value: 21,
      label: '3 Weeks (21 days)'
    },

    {
      value: 30,
      label: '1 Month (30 days)'
    }

  ];

  handleConfirm() {

    if (!this.book) {

      this.error =
        'Book information is missing';

      return;

    }

    if (this.checkoutDays < 1) {

      this.error =
        'Please select valid period';

      return;

    }

    this.error = '';

    this.confirm.emit({

      bookId: this.book.id,

      checkoutDays:
        this.checkoutDays,

      notes:
        this.notes.trim() || null

    });

  }

  handleClose() {

    if (!this.loading) {

      this.checkoutDays = 14;

      this.notes = '';

      this.error = '';

      this.close.emit();

    }

  }

  // calculateDueDate(): string {

  //   const dueDate = new Date();

  //   dueDate.setDate(
  //     dueDate.getDate() +
  //     this.checkoutDays
  //   );

  //   return dueDate.toLocaleDateString(
  //     'en-US',
  //     {

  //       weekday: 'long',

  //       month: 'long',

  //       day: 'numeric',

  //       year: 'numeric'

  //     }
  //   );

  // }


  calculateDueDate(): string {

  const today = new Date();

  console.log('Today:', today);
  console.log('checkoutDays:', this.checkoutDays);

  const dueDate = new Date(today);

  dueDate.setDate(dueDate.getDate() + Number(this.checkoutDays));

  console.log('Calculated Due Date:', dueDate);

  return dueDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

}
}