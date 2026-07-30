import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CurrentLoanCard } from '../current-loan-card/current-loan-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-current-loans',
  standalone:true,
  imports: [FormsModule,CommonModule,CurrentLoanCard],
  templateUrl: './current-loans.html',
  styleUrl: './current-loans.css',
})
export class CurrentLoans {
  @Input() myLoans: any[] = [];
}
