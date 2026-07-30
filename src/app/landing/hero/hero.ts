import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../services/Dashboard.Service'; 

@Component({
  selector: 'app-hero',
  standalone : true,
  imports: [
  CommonModule,
  RouterModule,
  MatIconModule,
],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit{
heroStats = {
  totalBooks: 0,
  totalMembers: 0,
  borrowedBooks: 0,
  averageRating: 0,
  mostBorrowedBook : ''
};

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.dashboardService.getHeroStats().subscribe({
      next: (res) => {
         console.log(res);
        this.heroStats = res;

           this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
