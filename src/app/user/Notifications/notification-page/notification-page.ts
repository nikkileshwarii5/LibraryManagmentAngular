import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit,HostListener, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { NotificationItem } from '../notification-item/notification-item';

@Component({
  selector: 'app-notification-page',
  standalone:true,
  imports: [CommonModule,FormsModule,NotificationItem],
  templateUrl: './notification-page.html',
  styleUrl: './notification-page.css',
})
export class NotificationPage implements OnInit  {
  notifications: any[] = [];

  totalPages = 0;
  currentPage = 0;

  totalCount = 0;

unreadCount = 0;

readCount = 0;

  // loading = false;

  tabValue = 'all';

  page = 1;

  selectedTypes: string[] = [];

  selectedNotification: any = null;

  showMenu = false;

  notificationTypes: any = {
    DUE_DATE_ALERT: {
      label: 'Due Date Alert',
      color: '#f44336',
      icon: 'fa-clock'
    },
    BOOK_REMINDER: {
      label: 'Book Reminder',
      color: '#ff9800',
      icon: 'fa-bookmark'
    },
    NEW_ARRIVAL: {
      label: 'New Arrival',
      color: '#4caf50',
      icon: 'fa-burst'
    },
    RECOMMENDATION: {
      label: 'Recommendation',
      color: '#2196f3',
      icon: 'fa-thumbs-up'
    },
    RESERVATION_AVAILABLE: {
      label: 'Reservation Available',
      color: '#9c27b0',
      icon: 'fa-calendar-check'
    },
    SUBSCRIPTION_EXPIRING: {
      label: 'Subscription Expiring',
      color: '#ff5722',
      icon: 'fa-tv'
    },
    FINE_NOTIFICATION: {
      label: 'Fine Notification',
      color: '#f44336',
      icon: 'fa-dollar-sign'
    },
    BOOK_RETURNED: {
      label: 'Book Returned',
      color: '#00bcd4',
      icon: 'fa-share-from-square'
    }
  };

  constructor(
    private notificationService: NotificationService,private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

   this.refreshPage();

  }
refreshPage() {

  this.loadNotifications();
  this.loadCounts();

  this.cdr.detectChanges();

}

  loadNotifications(): void {

    // this.loading = true;

    const params: any = {

      page: this.page - 1,

      size: 20

    };

    if (this.tabValue === 'unread') {

      params.isRead = false;

    }

    if (this.tabValue === 'read') {

      params.isRead = true;

    }

    if (this.selectedTypes.length > 0) {

      params.types =
        this.selectedTypes.join(',');

    }

    this.notificationService
      .fetchNotifications(params)
      .subscribe({

        next: (response: any) => {

          console.log('Notifications Response:', response);

          this.notifications =response.content || [];
          console.log('Notifications Array:', this.notifications);

          this.totalPages =response.totalPages || 0;

          this.currentPage =response.number || 0;


          this.cdr.detectChanges();

          // this.loading = false;

        },

        error: () => {

          // this.loading = false;

        }

      });
  }

  handleTabChange(tab: string): void {

    this.tabValue = tab;

    this.page = 1;

    this.loadNotifications();
  }

  handlePageChange(page: number): void {

    this.page = page;

    this.loadNotifications();
  }

  handleTypeFilter(type: string): void {

    if (
      this.selectedTypes.includes(type)
    ) {

      this.selectedTypes =
        this.selectedTypes.filter(
          t => t !== type
        );

    } else {

      this.selectedTypes.push(type);

    }

    this.page = 1;

    this.loadNotifications();
  }

  clearFilters(): void {

    this.selectedTypes = [];

    this.page = 1;

    this.loadNotifications();
  }

  handleMarkAllAsRead(): void {

    this.notificationService
      .markAllNotificationsAsRead()
      .subscribe(() => {

        // this.loadNotifications();

        this.refreshPage();

      });
  }

  handleClearAll(): void {

    if (
      confirm(
        'Are you sure you want to delete all notifications?'
      )
    ) {

      this.notificationService
        .deleteAllNotifications()
        .subscribe(() => {

          // this.loadNotifications();   
          this.refreshPage();

        });

    }
  }

  handleCardClick(
    notification: any
  ): void {

    if (!notification.isRead) {

      this.notificationService
        .markNotificationAsRead(
          notification.id
        )
        .subscribe(() => {
           this.refreshPage();
          // this.loadNotifications();

        });

    }
  }




  openMenu(event: Event, notification: any): void {

  event.stopPropagation();

  if (
    this.showMenu &&
    this.selectedNotification?.id === notification.id
  ) {
    this.closeMenu();
    return;
  }

  this.selectedNotification = notification;
  this.showMenu = true;
}

  closeMenu(): void {

    this.selectedNotification = null;

    this.showMenu = false;
  }

  handleMarkAsRead(): void {

    if (
      this.selectedNotification &&
      !this.selectedNotification.isRead
    ) {

      this.notificationService
        .markNotificationAsRead(
          this.selectedNotification.id
        )
        .subscribe(() => {

          // this.loadNotifications();

           this.refreshPage();
  this.closeMenu();

        });

    }

    // this.closeMenu();
  }

  handleDelete(): void {

    if (this.selectedNotification) {

      this.notificationService
        .deleteNotification(
          this.selectedNotification.id
        )
        .subscribe(() => {

          // this.loadNotifications();

           this.refreshPage();
  this.closeMenu();
        });

    }

    // this.closeMenu();
  }

loadCounts() {

  this.notificationService
      .fetchNotificationStats()
      .subscribe(stats => {

        this.totalCount = stats.totalCount;

        this.unreadCount = stats.unreadCount;

        this.readCount = stats.readCount;

        this.cdr.detectChanges();

      });

}


notificationTypeEntries() {
  return Object.entries(this.notificationTypes).map(
    ([key, value]: any) => ({
      key,
      label: value.label,
      icon: value.icon
    })
  );


}

getEmptyState() {

  switch (this.tabValue) {

    case 'unread':
      return {
        icon: 'fa-circle-check',
        title: 'All caught up!',
        message: 'You have no unread notifications.'
      };

    case 'read':
      return {
        icon: 'fa-inbox',
        title: 'No read notifications',
        message: 'Your read notifications will appear here.'
      };

    default:
      return {
        icon: 'fa-bell',
        title: 'No notifications yet',
        message: 'When you receive notifications, they will appear here.'
      };
  }
}


@HostListener('document:click')
onDocumentClick() {
  this.closeMenu();
}
}
