import {Component,Input,Output,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarDrawer } from '../sidebar-drawer/sidebar-drawer';

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-sidebar',
  standalone:true,
  imports: [CommonModule,FormsModule,SidebarDrawer],
  templateUrl: './user-sidebar.html',
  styleUrl: './user-sidebar.css',
})
export class UserSidebar {
   @Input() mobileOpen = false;

  @Input() isMobile = false;

  @Output() mobileOpenChange = new EventEmitter<boolean>();

  handleDrawerToggle() {
    this.mobileOpen = !this.mobileOpen;
    this.mobileOpenChange.emit(this.mobileOpen);
  }

  setMobileOpen(value: boolean) {
    this.mobileOpen = value;
    this.mobileOpenChange.emit(value);
  }

}
