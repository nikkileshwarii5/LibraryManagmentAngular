import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../../../landing/navbar/navbar';
import { UserSidebar } from '../../../userlayout/user-sidebar/user-sidebar';
@Component({
  selector: 'app-layout',
  standalone:true,
  imports: [CommonModule,FormsModule,RouterModule,Navbar,UserSidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
