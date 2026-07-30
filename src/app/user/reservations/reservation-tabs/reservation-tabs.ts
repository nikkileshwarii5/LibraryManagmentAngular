import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-tabs',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reservation-tabs.html',
  styleUrl: './reservation-tabs.css',
})
export class ReservationTabs {
  @Input() activeTab = 0;

  @Output() activeTabChange = new EventEmitter<number>();

  tabs = [
    { label: 'All Reservations', icon: 'menu_book' },
    { label: 'Active', icon: 'alarm' },
    { label: 'Completed', icon: 'check_circle' },
  ];

  setTab(index: number) {
    this.activeTabChange.emit(index);
  }
}
