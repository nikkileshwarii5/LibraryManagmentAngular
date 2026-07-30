import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-success',
  imports: [CommonModule,FormsModule],
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.css',
})
export class PaymentSuccess implements OnInit {

  paymentId: any;

  constructor(

    private route: ActivatedRoute,

    private paymentService: PaymentService

  ) {}

  ngOnInit(): void {

    // ✅ GET PAYMENT ID FROM URL

    this.paymentId =
      this.route.snapshot.paramMap.get('id');

    console.log(
      'PAYMENT ID:',
      this.paymentId
    );

    // ✅ VERIFY PAYMENT

    const payload = {

      paymentId:
        Number(this.paymentId)

    };

    this.paymentService
      .verifyPayment(payload)
      .subscribe({

        next: (res: any) => {

          console.log(
            'VERIFY SUCCESS',
            res
          );

        },

        error: (err) => {

          console.log(
            'VERIFY ERROR',
            err
          );

        }

      });

  }
}
