import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './reservation-dialog.html',
  styleUrl: './reservation-dialog.css'
})
export class ReservationDialog {

  @Input() open = false;

  @Input() loading = false;

  @Input() book: any;

  @Output() close =
    new EventEmitter<void>();

  @Output() confirm =
    new EventEmitter<any>();

  notes = '';

  error = '';

  handleConfirm() {

    if (!this.book) {

      this.error =
        'Book information is missing';

      return;

    }

    this.error = '';

    this.confirm.emit({

      bookId: this.book.id,

      notes:
        this.notes.trim() || null

    });

  }

  handleClose() {

    if (!this.loading) {

      this.notes = '';

      this.error = '';

      this.close.emit();

    }

  }

}