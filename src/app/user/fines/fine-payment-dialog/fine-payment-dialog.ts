import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-fine-payment-dialog',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './fine-payment-dialog.html',
  styleUrl: './fine-payment-dialog.css',
})
export class FinePaymentDialog {
   @Input() paymentDialog: any;

  @Output() close = new EventEmitter<void>();

  @Output() confirm = new EventEmitter<void>();
}
