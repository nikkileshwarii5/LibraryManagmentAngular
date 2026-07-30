import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cancel-subscription-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl:
    './cancel-subscription-dialog.html',

  styleUrl:
    './cancel-subscription-dialog.css'
})
export class CancelSubscriptionDialog {

   @Input() open = false;

  @Input() subscription: any;

  @Input() loading = false;

  @Output() close = new EventEmitter();

  @Output() confirm = new EventEmitter();

  selectedReason = '';

  customReason = '';

  error = '';

  cancellationReasons = [
    'Too expensive',
    'Not using enough features',
    'Found a better alternative',
    'Temporarily not reading books',
    'Technical issues',
    'Other',
  ];

  get daysRemaining(): number {

    if (!this.subscription) {
      return 0;
    }

    const now = new Date();

    const endDate = new Date(this.subscription.endDate);

    const remaining =
      endDate.getTime() - now.getTime();

    return Math.ceil(
      remaining / (1000 * 60 * 60 * 24)
    );
  }

  formatDate(dateString: string): string {

    return new Date(dateString)
      .toLocaleDateString('en-US', {

        month: 'short',

        day: 'numeric',

        year: 'numeric'
      });
  }

  handleConfirm() {

    if (!this.selectedReason) {

      this.error =
        'Please select a reason for cancellation';

      return;
    }

    if (
      this.selectedReason === 'Other' &&
      this.customReason.trim().length < 5
    ) {

      this.error =
        'Please provide a reason (minimum 5 characters)';

      return;
    }

    this.error = '';

    const reason =
      this.selectedReason === 'Other'
        ? this.customReason.trim()
        : this.selectedReason;

    this.confirm.emit({

      subscriptionId: this.subscription.id,

      reason
    });
  }

  handleClose() {

    this.selectedReason = '';

    this.customReason = '';

    this.error = '';

    this.close.emit();
  }
}