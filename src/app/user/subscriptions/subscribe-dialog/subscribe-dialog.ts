import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { PaymentService }
from '../../../services/payment.service';

@Component({
  selector: 'app-subscribe-dialog',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './subscribe-dialog.html',

  styleUrl: './subscribe-dialog.css'
})

export class SubscribeDialog {

  paymentMethod = 'RAZORPAY';

  @Input() open = false;

  @Input() plan: any;

  @Output() close =new EventEmitter<void>();

  @Output() subscriptionUpdated =new EventEmitter<void>();
  
  @Output() subscriptionError = new EventEmitter<string>();

  constructor(private paymentService: PaymentService) {}

subscribe() {

  const userData = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const payload = {

    userId: Number(userData.user.id),

    paymentType: 'MEMBERSHIP',

    gateway: 'RAZORPAY',

    amount: Number(this.plan.price),

    currency: 'INR',

    description: this.plan.name,

    // subscriptionId: Number(this.plan.id)

     planId: Number(this.plan.id)

  };

  console.log(payload);
  

  this.paymentService
    .initiatePayment(payload)
    .subscribe({

      next: (res: any) => {

        console.log('SUCCESS:', res);

        this.openRazorpay(res);



      },

      // error: (err) => {

      //   console.log('ERROR:', err.error);

      // }

      error: (err) => {

  const message =
    err?.error?.message ||
    'Unable to process subscription';

  this.subscriptionError.emit(message);

}

    });

}

  openRazorpay(response: any) {

    const options = {

      key: response.key,

      amount: response.amount,

      currency: response.currency,

      order_id: response.razorpayOrderId,

      name: 'Library Subscription',

      description: this.plan.name,

      // handler: (paymentResponse: any) => {

      //   console.log(paymentResponse);

      // }

      handler: (paymentResponse: any) => {

  console.log(paymentResponse);

  const verifyPayload = {

    paymentId: response.paymentId,

    razorpayPaymentId:
      paymentResponse.razorpay_payment_id,

    razorpayOrderId:
      paymentResponse.razorpay_order_id,

    razorpaySignature:
      paymentResponse.razorpay_signature

  };

  this.paymentService
    .verifyPayment(verifyPayload)
    .subscribe({

      next: (verifyRes: any) => {

        console.log('PAYMENT VERIFIED',verifyRes);
         this.subscriptionUpdated.emit();

           this.close.emit();

      },

      error: (err) => {

        console.log(
          'VERIFY ERROR',
          err
        );

      }

    });

}

    };

    const rzp =
      new (window as any).Razorpay(options);

    rzp.open();

  }

}