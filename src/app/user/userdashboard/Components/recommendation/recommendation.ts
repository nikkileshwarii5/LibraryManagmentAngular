import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../../../services/Dashboard.Service'
@Component({
  selector: 'app-recommendation',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './recommendation.html',
  styleUrls: ['./recommendation.css']
})
export class Recommendation {
   recommendations: any[] = [];

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
     private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadRecommendations();

  }

  loadRecommendations() {

    this.dashboardService
      .fetchRecommendations()
      .subscribe({

        next: (res: any) => {

          console.log('Recommendations:', res);

          this.recommendations = res || [];

           this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  navigateToBook(bookId: number) {

    this.router.navigate(['/user/books', bookId]);

  }

  navigateToBooks() {

    this.router.navigate(['/user/books']);

  }
}
