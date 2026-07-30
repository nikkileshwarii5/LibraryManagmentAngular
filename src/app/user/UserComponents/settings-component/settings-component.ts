import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './settings-component.html',
  styleUrls: ['./settings-component.css']
})
export class SettingsComponent {

  snackbar = {
    open: false,
    message: '',
    severity: 'success'
  };

  deleteAccountDialog = false;

  notifications = {
    emailNotifications: true,
    pushNotifications: true,
    bookReminders: true,
    dueDateAlerts: true,
    newArrivals: false,
    recommendations: true,
    marketingEmails: false,
  };

  handleNotificationChange(setting: keyof typeof this.notifications) {
    this.notifications[setting] = !this.notifications[setting];
    this.showSnackbar('Notification settings updated', 'success');
  }

  handleDeleteAccount() {
    this.showSnackbar('Account deletion request submitted', 'warning');
    this.deleteAccountDialog = false;
  }

  showSnackbar(message: string, severity: string = 'success') {
    this.snackbar = {
      open: true,
      message,
      severity
    };

    setTimeout(() => {
      this.handleCloseSnackbar();
    }, 4000);
  }

  handleCloseSnackbar() {
    this.snackbar.open = false;
  }
}