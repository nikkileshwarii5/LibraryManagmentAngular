import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { columns } from '../books/table-columns';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-data-table',
  standalone:true,
  imports: [CommonModule,FormsModule,MatIconModule],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
})
export class DataTable {
  // @Input() columns: any[] = [];
  // @Input() data: any[] = [];

   @Output() edit = new EventEmitter<any>();
   @Output() delete = new EventEmitter<any>();

   @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() loading = false;

  @Input() page = 0;
  @Input() rowsPerPage = 10;
  @Input() totalRows = 0;

  
  @Output() onPageChange = new EventEmitter<number>();
  @Output() onRowsPerPageChange = new EventEmitter<number>();

  changePage(newPage: number) {
    this.onPageChange.emit(newPage);
  }

  changeRowsPerPage(event: any) {
    this.onRowsPerPageChange.emit(+event.target.value);
  }

  onEdit(row: any) {
  this.edit.emit(row);
}

onDelete(row: any) {
  this.delete.emit(row);
}
}
