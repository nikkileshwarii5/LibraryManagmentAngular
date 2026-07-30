import {ChangeDetectorRef, Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubscriptionService } from '../../../services/subscription.service';
import { SubscriptionPlanService } from '../../../services/subscriptionPlan.service'
import { Benefits } from '../benefits/benefits';
import { SubscriptionPlanCard } from '../subscription-plan-card/subscription-plan-card';
import { ActiveSubscriptionCard } from '../active-subscription-card/active-subscription-card';
import { SubscribeDialog } from '../subscribe-dialog/subscribe-dialog';
import { CancelSubscriptionDialog } from '../cancel-subscription-dialog/cancel-subscription-dialog';

@Component({
  selector: 'app-subscriptions-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SubscriptionPlanCard,
    ActiveSubscriptionCard,
    SubscribeDialog,
    CancelSubscriptionDialog,Benefits
  ],
  templateUrl: './subscriptions-page.html',
  styleUrl: './subscriptions-page.css'
})
export class SubscriptionsPage implements OnInit {

  plans: any[] = [];

  activeSubscription: any = null;

  loading = false;

  subscribeDialogOpen = false;

  cancelDialogOpen = false;

  selectedPlan: any = null;

  selectedSubscription: any = null;
  hasActiveSubscription: boolean = false;

  snackbar = {
    open: false,
    message: '',
    severity: 'success'
  };

  constructor(
    private subscriptionService: SubscriptionService,
    private subscriptionPlanService: SubscriptionPlanService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadPlans();

    this.loadActiveSubscription();

  }

  loadPlans() {

    this.loading = true;

    this.subscriptionService
      .getAllPlans()
      .subscribe({

        next: (res: any) => {

          this.plans = res.content || [];

          this.loading = false;
          this.cdr.detectChanges();

        },

        error: () => {

          this.loading = false;
          this.cdr.detectChanges();

        }

      });

  }

  // loadActiveSubscription() {

  //   this.subscriptionPlanService
  //     .fetchAllActiveSubscriptions(0, 10)
  //     .subscribe({

  //       next: (res: any) => {

  //         // this.activeSubscription =
  //         //   res.content?.[0] || null;

  //         console.log(res);
  //       this.activeSubscription = res?.[0] || null;

  //       this.cdr.detectChanges();



  //       }

  //     });

  // }

  loadActiveSubscription() {

  this.subscriptionPlanService
    .getActiveSubscription()
    .subscribe({

      next: (res: any) => {

        console.log("ACTIVE SUBSCRIPTION", res);

        this.activeSubscription = res;

         this.hasActiveSubscription = !!res;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

        this.activeSubscription = null;

        this.hasActiveSubscription = false;

      }

    });

}

  openSubscribeDialog(plan: any) {

    this.selectedPlan = plan;

    this.subscribeDialogOpen = true;

  }

  openCancelDialog(subscription: any) {

    this.selectedSubscription = subscription;

    this.cancelDialogOpen = true;

  }

  renewSubscription(subscription: any) {

    this.subscriptionPlanService
      .renewSubscription(subscription.id, {})
      .subscribe({

        next: () => {

          this.showSnackbar(
            'Subscription renewed successfully'
          );

        }

      });

  }

  cancelSubscription(data: any) {

    this.subscriptionPlanService
      .cancelSubscription(
        data.subscriptionId,
        data.reason
      )
      .subscribe({

        next: () => {

          this.showSnackbar(
            'Subscription cancelled successfully'
          );

          this.cancelDialogOpen = false;

          this.loadActiveSubscription();

        }

      });

  }

  showSnackbar(message: string) {

    this.snackbar = {

      open: true,

      message,

      severity: 'success'

    };

    setTimeout(() => {

      this.snackbar.open = false;

    }, 3000);

  }

}