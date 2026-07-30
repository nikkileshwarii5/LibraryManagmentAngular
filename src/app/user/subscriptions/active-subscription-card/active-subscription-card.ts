import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-subscription-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-subscription-card.html',
  styleUrl: './active-subscription-card.css'
})
export class ActiveSubscriptionCard {

  @Input() subscription: any;

  @Output() renew =
    new EventEmitter<any>();

  @Output() cancel =
    new EventEmitter<any>();

  get daysRemaining(): number {

    if (!this.subscription?.endDate) {
      return 0;
    }

    const end =
      new Date(this.subscription.endDate);

    const now =
      new Date();

    const diff =
      end.getTime() - now.getTime();

    return Math.ceil(
      diff / (1000 * 60 * 60 * 24)
    );

  }

 get progressPercentage(): number {

  if (!this.subscription?.startDate || !this.subscription?.endDate) {
    return 0;
  }

  const start = new Date(this.subscription.startDate).getTime();
  const end = new Date(this.subscription.endDate).getTime();
  const today = new Date().getTime();

  const totalDuration = end - start;
  const remainingDuration = end - today;

  const percentage = (remainingDuration / totalDuration) * 100;

  return Math.min(Math.max(percentage, 0), 100);
}
}