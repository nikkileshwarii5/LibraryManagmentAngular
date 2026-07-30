import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-statscard',
   standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './statscard.html',
  styleUrl: './statscard.css',
})
export class Statscard {
   @Input() title!: string;
  @Input() value!: any;
  @Input() icon!: string;   // Bootstrap icon class
  @Input() color: string = 'primary';
  @Input() trend?: string;
  @Input() trendValue?: string;
  @Input() subtitle?: string;
  @Input() loading: boolean = false;

  getColorClass() {
    const map: any = {
      primary: 'bg-primary',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-danger',
      info: 'bg-info'
    };
    return map[this.color] || 'bg-primary';
  }
}
