import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-settings-component.html',
  styleUrls: ['./admin-settings-component.css']
})
export class AdminSettingsComponent {

  snackbar = {
    open: false,
    message: '',
    severity: 'success'
  };

  deleteAccountDialog = false;

  notifications = {

    emailNotifications: true,

    pushNotifications: true,

    returnRequests: true,

    lostBooks: true,

    damagedBooks: true,

    reservations: true,

    finePayments: true,

    newUsers: true

  };

  library = {

    autoApproveReservations: false,

    enableFineCalculation: true,

    allowRenewals: true

  };

  security = {

    twoFactor: false,

    loginAlerts: true,

    sessionTimeout: true

  };

  appearance = {

    darkMode: false,

    compactMode: false,

    animations: true

  };

  handleNotificationChange(setting: keyof typeof this.notifications) {

    this.notifications[setting] = !this.notifications[setting];

    this.showSnackbar('Notification settings updated');

  }

  toggleLibrarySetting(setting: keyof typeof this.library) {

    this.library[setting] = !this.library[setting];

    this.showSnackbar('Library preferences updated');

  }

  toggleSecuritySetting(setting: keyof typeof this.security) {

    this.security[setting] = !this.security[setting];

    this.showSnackbar('Security settings updated');

  }

  toggleAppearanceSetting(setting: keyof typeof this.appearance) {

    this.appearance[setting] = !this.appearance[setting];

    this.showSnackbar('Appearance updated');

  }

  resetSettings() {

    this.showSnackbar(
      'Settings reset successfully',
      'warning'
    );

  }

  handleDeleteAccount() {

    this.deleteAccountDialog = false;

    this.showSnackbar(
      'Delete request submitted',
      'warning'
    );

  }

  showSnackbar(
    message: string,
    severity: string = 'success'
  ) {

    this.snackbar = {

      open: true,

      message,

      severity

    };

    setTimeout(() => {

      this.handleCloseSnackbar();

    }, 3500);

  }

  handleCloseSnackbar() {

    this.snackbar.open = false;

  }

}