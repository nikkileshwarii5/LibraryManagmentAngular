import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-my-fine-card',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './my-fine-card.html',
  styleUrl: './my-fine-card.css',
})
export class MyFineCard {
   @Input() fine: any;

  @Output() payFine = new EventEmitter<any>();

  getStatusBadge(status: string) {

    switch (status) {

      case 'PENDING':
        return 'bg-warning';

      case 'PAID':
        return 'bg-success';

      case 'WAIVED':
        return 'bg-secondary';

      default:
        return 'bg-primary';
    }
  }
}
