import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-fine-stats',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './my-fine-stats.html',
  styleUrl: './my-fine-stats.css',
})
export class MyFineStats {

  @Input() filteredFines: any[] = [];

  @Input() totalOutstanding = 0;

  @Input() totalPaid = 0;
}
