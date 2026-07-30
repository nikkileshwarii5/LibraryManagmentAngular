import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-snackbar-alert',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './snackbar-alert.html',
  styleUrl: './snackbar-alert.css',
})
export class SnackbarAlert {
  @Input() snackbar: any;
}
