import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { SubscriptionPlanService } from '../../../services/subscriptionPlan.service';
import { BookLoanService } from '../../../services/book-loan.service';
import {Router,RouterModule} from '@angular/router';

import {navigationItems,secondaryItems} from '../../../services/navigation-items'
import { FormsModule } from '@angular/forms';
import { LoanBadgeService } from '../../../services/loan-state.service';

@Component({
  selector: 'app-sidebar-drawer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './sidebar-drawer.html',
  styleUrls: ['./sidebar-drawer.css']
})
export class SidebarDrawer implements OnInit{

  @Input() isMobile = false;

  @Output() closeDrawer =
    new EventEmitter<void>();

  myLoans: any[] = [];

  activeSubscription: any = null;

  navigationItems = navigationItems;

  secondaryItems = secondaryItems;

  showLoanBadge = false;

  

  constructor(
    private router: Router,private subscriptionPlanService: SubscriptionPlanService, private bookLoanService: BookLoanService,private loanBadgeService: LoanBadgeService
  ) {}

  ngOnInit(): void {
  this.loadActiveSubscription();
  this.loadLoanBadge();

  this.loanBadgeService.showBadge$
    .subscribe(value => {
      this.showLoanBadge = value;
    });
}

loadActiveSubscription(): void {
  this.subscriptionPlanService
    .getActiveSubscription()
    .subscribe({
      next: (res) => {
        this.activeSubscription = res;
      },
      error: () => {
        this.activeSubscription = null;
      }
    });
}

loadLoanBadge(): void {
  this.bookLoanService
    .fetchMyBookLoans(null, 0, 100)
    .subscribe({
      next: (res: any) => {
        this.myLoans = res?.content || [];
      },
      error: () => {
        this.myLoans = [];
      }
    });
}

  handleNavigation(path: string) {

    this.router.navigate([path]);

    if (this.isMobile) {

      this.closeDrawer.emit();

    }

  }

  handleLogout() {

    localStorage.clear();

    this.router.navigate(['/login']);

  }

  isActive(path: string): boolean {

    if (path === '/') {

      return this.router.url === '/';

    }

    return this.router.url.startsWith(path);

  }

  // getBadgeCount(badge: string): number {

  //   if (badge === 'loans') {

  //     return (
  //       this.myLoans?.filter(
  //         (loan: any) =>
  //           loan.status === 'ACTIVE'
  //           || loan.status === 'OVERDUE'
  //       ).length || 0
  //     );

  //   }

  //   if (badge === 'subscription') {

  //     return this.activeSubscription ? 1 : 0;

  //   }

  //   return 0;

  // }


 getBadgeCount(badge: string): number {

  if (badge === 'loans') {

    if (!this.showLoanBadge) {
      return 0;
    }

    return this.myLoans.filter(
      (loan: any) => loan.status === 'OVERDUE'
    ).length;
  }

  if (badge === 'subscription') {
    return this.activeSubscription ? 1 : 0;
  }

  return 0;
}

}