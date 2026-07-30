import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-stats-card',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.css',
})
export class StatsCard {
   @Input() icon = '';

  @Input() value: any;

  @Input() title = '';

  @Input() subtitle = '';

  @Input() bgColor = '';

  @Input() textColor = '';

}
