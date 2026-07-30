import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FineService } from '../../../services/fine.service'

import { MyFineStats } from '../my-fine-stats/my-fine-stats';
import { MyFineCard } from '../my-fine-card/my-fine-card';
import { FinePaymentDialog } from '../fine-payment-dialog/fine-payment-dialog';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-my-fines',
  standalone:true,
  imports: [FormsModule,CommonModule,FinePaymentDialog,MyFineCard,MyFineStats],
  templateUrl: './my-fines.html',
  styleUrl: './my-fines.css',
})
export class MyFines implements OnInit{
  myFines: any[] = [];
  filteredFines: any[] = [];
statusFocused = false;

activeDropdown: string | null = null;
typeFocused = false;
  statusFilter = '';
  typeFilter = '';

  loading = false;

  paymentDialog = {
    open: false,
    fine: null as any
  };

  snackbar = {
    open: false,
    message: '',
    type: 'success'
  };

  constructor(private fineService: FineService, private cdr: ChangeDetectorRef,private paymentService: PaymentService,) {}

  ngOnInit(): void {
    this.loadFines();
  }

  loadFines() {
    this.loading = true;

     this.fineService.getMyFines().subscribe({
      next: (res: any) => {

        this.myFines = res.content || res;
        this.filteredFines = [...this.myFines];

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  applyFilters() {

    this.filteredFines = this.myFines.filter(fine => {

      const statusMatch =
        !this.statusFilter ||
        fine.status === this.statusFilter;

      const typeMatch =
        !this.typeFilter ||
        fine.type === this.typeFilter;

      return statusMatch && typeMatch;
    });
  }

  clearFilters() {
    this.statusFilter = '';
    this.typeFilter = '';
    this.applyFilters();
  }

  handlePayFine(fine: any) {
    this.paymentDialog = {
      open: true,
      fine
    };
  }

  closeDialog() {
    this.paymentDialog = {
      open: false,
      fine: null
    };
  }

  // confirmPayment() {

  //   this.fineService.payFine(this.paymentDialog.fine.id)
  //     .subscribe({
  //       next: () => {

  //         this.showSnackbar(
  //           'Fine paid successfully',
  //           'success'
  //         );

  //         this.closeDialog();

  //         this.loadFines();
  //       },
  //       error: () => {
  //         this.showSnackbar(
  //           'Failed to process payment',
  //           'danger'
  //         );
  //       }
  //     });
  // }


  confirmPayment() {

  this.fineService
      .payFine(this.paymentDialog.fine.id)
      .subscribe({

        next: (res:any) => {

          console.log(res);

          this.openRazorpay(res);

        },

        error: () => {

          this.showSnackbar(
            'Failed to process payment',
            'danger'
          );

        }

      });

}

openRazorpay(response:any){

    const options = {

      key: response.key,

      amount: response.amount,

      currency: response.currency,

      order_id: response.razorpayOrderId,

      name: 'Library Fine',

      description: response.description,

      handler: (paymentResponse:any)=>{

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

            next:()=>{

              this.showSnackbar(
                'Fine paid successfully',
                'success'
              );

              this.closeDialog();

              this.loadFines();

            }

          });

      }

    };

    const rzp = new (window as any).Razorpay(options);

    rzp.open();

}

  showSnackbar(message: string, type: string) {

    this.snackbar = {
      open: true,
      message,
      type
    };

    setTimeout(() => {
      this.snackbar.open = false;
    }, 3000);
  }

  get totalOutstanding(): number {
    return this.filteredFines.reduce(
      (sum, fine) => sum + (fine.amountOutstanding || 0),
      0
    );
  }

  get totalPaid(): number {
    return this.filteredFines.reduce(
      (sum, fine) => sum + (fine.amountPaid || 0),
      0
    );
  }


  
}
