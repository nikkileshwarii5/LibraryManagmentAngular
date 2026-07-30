import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { NotificationService } from '../../../services/notification.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notification-bell',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './notification-bell.html',
  styleUrl: './notification-bell.css',
})
export class NotificationBell implements OnInit, OnDestroy {
   unreadCount = 0;

  private subscription = new Subscription();

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadUnreadCount();

    const refreshSubscription = interval(30000).subscribe(() => {
      this.loadUnreadCount();
    });

    this.subscription.add(refreshSubscription);
  }

  loadUnreadCount(): void {

    this.notificationService.fetchUnreadCount()
      .subscribe({
        next: (count) => {
          this.unreadCount = count;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  handleClick(): void {
    this.router.navigate(['/user/notifications']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
