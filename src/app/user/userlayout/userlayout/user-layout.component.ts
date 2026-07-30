import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { UserSidebar } from '../user-sidebar/user-sidebar';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service'
import { ElementRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NotificationBell } from '../../Notifications/notification-bell/notification-bell';

@Component({
  selector: 'app-user-layout',
  standalone:true,
  imports: [CommonModule,FormsModule,UserSidebar,RouterOutlet,RouterModule,NotificationBell],
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css'],
})
export class UserLayoutComponent  implements OnInit {
  drawerWidth = 280;

  mobileOpen = false;
  pageTitle = 'Dashboard';

user: any = {};

  profileMenuOpen = false;

  isMobile = window.innerWidth < 768;

  @ViewChild('profileContainer')
profileContainer!: ElementRef;

  constructor(
  private router: Router,
  private authService: AuthService,
  private cdr: ChangeDetectorRef,
  private elementRef: ElementRef
) {

  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {

      const url = this.router.url;

      if (url.includes('/user/dashboard')) {
        this.pageTitle = 'Dashboard';
      }
      else if (url.includes('/user/books')) {
        this.pageTitle = 'Browse Books';
      }
      else if (url.includes('/user/loans')) {
        this.pageTitle = 'My Loans';
      }
      else if (url.includes('/user/reservations')) {
        this.pageTitle = 'My Reservations';
      }
      else if (url.includes('/user/fines')) {
        this.pageTitle = 'My Fines';
      }
      else if (url.includes('/user/subscriptions')) {
        this.pageTitle = 'Subscriptions';
      }
       else if (url.includes('/user/wishlist')) {
        this.pageTitle = 'My Wishlist';
      }
      else if (url.includes('/user/profile')) {
        this.pageTitle = 'Profile';
      }
      else if (url.includes('/user/settings')) {
        this.pageTitle = 'Settings';
      }
    });

}

ngOnInit(): void {

  this.authService.getCurrentUser().subscribe({

    next: (res) => {

      // console.log("CURRENT USER:", res);

      this.user = res;
      this.cdr.detectChanges();

    },

    error: (err) => {

      console.log(err);

    }

  });

}

  @HostListener('window:resize')
  onResize() {

    this.isMobile = window.innerWidth < 768;

  }

  handleDrawerToggle() {

    this.mobileOpen = !this.mobileOpen;

  }

  // handleProfileMenuOpen() {

  //   this.profileMenuOpen = true;

  // }

  handleProfileMenuOpen() {
  this.profileMenuOpen = !this.profileMenuOpen;
}

  handleProfileMenuClose() {

    this.profileMenuOpen = false;

  }

  handleNavigation(path: string) {

    this.router.navigate([path]);

    if (this.isMobile) {
      this.mobileOpen = false;
    }

  }

  handleLogout() {

    localStorage.clear();

    this.router.navigate(['/login']);

  }

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {

  if (
    this.profileContainer &&
    !this.profileContainer.nativeElement.contains(event.target)
  ) {
    this.profileMenuOpen = false;
  }
}
}
