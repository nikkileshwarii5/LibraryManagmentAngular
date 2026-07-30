import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscription-plan-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './subscription-plan-card.html',
  styleUrl: './subscription-plan-card.css'
})
export class SubscriptionPlanCard {

  @Input() plan: any;

  @Input() activeSubscription: any;

  @Output() subscribe =
    new EventEmitter<any>();


  get isCurrentPlan(): boolean {

    return (
      this.activeSubscription?.planId ===
      this.plan.id
    );
  }
  
get hasActiveSubscription(): boolean {
  return !!this.activeSubscription;
}

  get canUpgrade(): boolean {

    return (
      this.activeSubscription &&
      this.plan.price >
      this.activeSubscription
        ?.subscriptionPlan?.price
    );
  }

  // get buttonText(): string {

  //   if (this.isCurrentPlan) {

  //     return 'Current Plan';
  //   }

  //   if (this.canUpgrade) {

  //     return 'Upgrade Plan';
  //   }

  //   if (this.activeSubscription) {

  //     return 'Switch Plan';
  //   }

  //   return 'Subscribe';
  // }


  get buttonText(): string {

  if (this.isCurrentPlan) {
    return 'Current Plan';
  }

  if (this.hasActiveSubscription) {
    return 'Membership Active';
  }

  return 'Subscribe';
}

}