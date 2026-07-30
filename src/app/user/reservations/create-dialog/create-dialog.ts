import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-dialog',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './create-dialog.html',
  styleUrls: ['./create-dialog.css']
})
export class CreateDialog {
    @Input() open = false;

  @Input() bookId = '';

  @Output() close = new EventEmitter();

  @Output() bookIdChange = new EventEmitter<string>();

  @Output() create = new EventEmitter();


}
