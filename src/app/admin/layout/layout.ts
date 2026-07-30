import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements AfterViewInit {
  notifications:any[]=[];

unreadCount=0;

constructor(
  private router: Router,
  private notificationService: NotificationService,
  @Inject(PLATFORM_ID) private platformId: Object
) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.setTitleFromRoute();
    });
}

  mobileOpen = false;
  subscriptionsOpen = true;
  tooltip: string | null = null;
  pageTitle: string = 'Admin Dashboard';

  showNotifications = false;
  showProfileMenu = false;

  navigationItems = [
    { title: 'Dashboard', path: '/admin/dashboard', icon: 'bi-speedometer2', description: 'Overview & Analytics' },
    { title: 'Books', path: '/admin/books', icon: 'bi-book', description: 'Books Catalog' },
    { title: 'Book Loans', path: '/admin/book-loans', icon: 'bi-journal-text', description: 'Borrowed Books' },
    { title: 'Fines', path: '/admin/fines', icon: 'bi-cash', description: 'Fine Records' },
    { title: 'Reservations', path: '/admin/reservations', icon: 'bi-bookmark-check', description: 'Book Reservations' },
    { title: 'Genres', path: '/admin/genres', icon: 'bi-grid', description: 'Subscription Management' },
    { title: 'Users', path: '/admin/users', icon: 'bi-people', description: 'Transaction History' },
    {
      title: 'Subscriptions',
      icon: 'bi-card-list',
      children: [
        { title: 'Subscription Plans', path: '/admin/subscription-plans' },
        { title: 'User Subscriptions', path: '/admin/user-subscriptions' }
      ]
    },
    { title: 'Payments', path: '/admin/payments', icon: 'bi-credit-card' },
    {
  title: 'Testimonials',
  path: '/admin/testimonials',
  icon: 'bi bi-chat-square-quote',
  description: 'Manage Testimonials'
}
  ];

  toggleSidebar() {
    this.mobileOpen = !this.mobileOpen;
  }

  toggleSubscriptions() {
    this.subscriptionsOpen = !this.subscriptionsOpen;
  }

  navigate(path: string, title: string) {
    if (path) {
      this.pageTitle = title;
      this.router.navigate([path]);
      this.mobileOpen = false;
    }
  }

  isActive(path: string): boolean {
    return this.router.url === path || this.router.url.startsWith(path + '/');
  }
ngOnInit() {
  this.setTitleFromRoute();
    this.loadNotificationCount();

   this.loadNotifications();
}
  logout() {
    this.showProfileMenu = false;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  showTooltip(type: string) {
    this.tooltip = type;
  }

  hideTooltip() {
    this.tooltip = null;
  }

  // toggleNotifications() {
  //   this.showNotifications = !this.showNotifications;
  //   this.showProfileMenu = false;
  // }

  toggleNotifications(){

   this.showNotifications=!this.showNotifications;

   if(this.showNotifications){

      this.loadNotifications();

      this.loadNotificationCount();

   }

}

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
    this.showNotifications = false;
  }

  goToProfile() {

  this.showProfileMenu = false;

  this.router.navigate(['/admin/profile']);

}

goToSettings() {

  this.showProfileMenu = false;

  this.router.navigate(['/admin/settings']);

}

  // ✅ FIXED: SSR safe
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initTooltips();
      });
    }
  }

  setTitleFromRoute() {
  const url = this.router.url;

  let title = 'Admin Dashboard'; // default

  this.navigationItems.forEach(item => {
    if (item.path && url.startsWith(item.path)) {
      title = item.title;
    }

    if (item.children) {
      item.children.forEach(child => {
        if (url.startsWith(child.path)) {
          title = child.title;
        }
      });
    }
  });

  this.pageTitle = title;
}

  // ✅ FIXED: No more "document is not defined"
  initTooltips() {
    if (!isPlatformBrowser(this.platformId)) return;

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    tooltipTriggerList.forEach((el: any) => {
      new (window as any).bootstrap.Tooltip(el, {
        placement: 'right',
        trigger: 'hover',
        offset: [0, 12],
        fallbackPlacements: [],
        popperConfig: (defaultBsPopperConfig: any) => {
          return {
            ...defaultBsPopperConfig,
            modifiers: [
              ...defaultBsPopperConfig.modifiers,
              {
                name: 'offset',
                options: { offset: [0, 12] }
              },
              {
                name: 'computeStyles',
                options: { adaptive: false }
              }
            ]
          };
        }
      });
    });
  }

loadNotificationCount() {

  this.notificationService
      .fetchUnreadCount()
      .subscribe({

        next: (count: number) => {

          this.unreadCount = count;

        },

        error: (err) => {

          console.error(err);

        }

      });

}

loadNotifications() {

  this.notificationService
      .fetchNotifications({
        page: 0,
        size: 10
      })
      .subscribe({

        next: (res: any) => {

          this.notifications = res.content;

        },

        error: (err) => {

          console.error(err);

        }

      });

}


}