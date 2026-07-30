import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationService } from '../../../services/notification.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-notification-item',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './notification-item.html',
  styleUrl: './notification-item.css',
})
export class NotificationItem {
  @Input() notification: any;

  @Output() menuClick = new EventEmitter<Event>();

openMenu(event: Event) {
  event.stopPropagation();
  this.menuClick.emit(event);
}

  constructor(
    private notificationService: NotificationService
  ) {}

  handleMarkAsRead(event: Event): void {

    event.stopPropagation();

    if (!this.notification.isRead) {

      this.notificationService
        .markNotificationAsRead(this.notification.id)
        .subscribe();

      this.notification.isRead = true;
    }
  }

  handleDelete(event: Event): void {

    event.stopPropagation();

    this.notificationService
      .deleteNotification(this.notification.id)
      .subscribe();
  }

  getIcon(type: string): string {

    switch (type) {

      case 'DUE_DATE_ALERT':
        return 'fa-regular fa-clock';

      case 'BOOK_REMINDER':
        return 'fa-solid fa-book';

      case 'NEW_ARRIVAL':
        return 'fa-solid fa-bell';

      case 'RECOMMENDATION':
        return 'fa-solid fa-circle-info';

      case 'RESERVATION_AVAILABLE':
        return 'fa-solid fa-calendar';

      case 'SUBSCRIPTION_EXPIRING':
        return 'fa-solid fa-id-card';

      case 'FINE_NOTIFICATION':
        return 'fa-solid fa-indian-rupee-sign';

      case 'BOOK_RETURNED':
        return 'fa-solid fa-circle-check';

      default:
        return 'fa-solid fa-bell';
    }
  }

  getColor(type: string): string {

    switch (type) {

      case 'DUE_DATE_ALERT':
      case 'FINE_NOTIFICATION':
        return 'danger';

      case 'BOOK_REMINDER':
        return 'warning';

      case 'NEW_ARRIVAL':
      case 'RECOMMENDATION':
        return 'info';

      case 'RESERVATION_AVAILABLE':
      case 'BOOK_RETURNED':
        return 'success';

      default:
        return 'primary';
    }
  }

  getTypeLabel(type: string): string {

  switch (type) {

    case 'DUE_DATE_ALERT':
      return 'Due Date Alert';

    case 'BOOK_REMINDER':
      return 'Book Reminder';

    case 'NEW_ARRIVAL':
      return 'New Arrival';

    case 'RECOMMENDATION':
      return 'Recommendation';

    case 'RESERVATION_AVAILABLE':
      return 'Reservation Available';

    case 'SUBSCRIPTION_EXPIRING':
      return 'Subscription Expiring';

    case 'FINE_NOTIFICATION':
      return 'Fine Notification';

    case 'BOOK_RETURNED':
      return 'Book Returned';

    default:
      return 'Notification';
  }
}

  formatTime(dateString: string): string {

    try {

      const date = new Date(dateString);

      const seconds =
        Math.floor((new Date().getTime() - date.getTime()) / 1000);

      if (seconds < 60) {
        return 'Just now';
      }

      if (seconds < 3600) {
        return Math.floor(seconds / 60) + ' minutes ago';
      }

      if (seconds < 86400) {
        return Math.floor(seconds / 3600) + ' hour ago';
      }

      return Math.floor(seconds / 86400) + ' days ago';

    } catch {

      return 'Recently';

    }
  }
}
