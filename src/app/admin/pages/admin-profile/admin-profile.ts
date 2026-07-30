import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/UserService';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css',
})
export class AdminProfile  implements OnInit {

   loading = false;

  editMode = false;

  admin: any = {};

  stats = {
    booksAdded: 0,
    usersManaged: 0,
    genresCreated: 0,
    reservationsApproved: 0,
    finesWaived: 0
  };

  constructor(
    private userService: UserService, private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadProfile();

    this.loadAdminStatistics();

  }

  loadProfile() {

    this.loading = true;

    this.userService.getProfile().subscribe({

      next: (res: any) => {

        this.admin = res;
         this.cd.detectChanges();

        this.loading = false;

      },

      error: err => {

        console.log(err);

        this.loading = false;

      }

    });

  }

  editProfile() {

    this.editMode = true;

  }

  cancelEdit() {

    this.editMode = false;

    this.loadProfile();

  }

  saveProfile() {

    this.userService
        .updateProfile(this.admin)
        .subscribe({

          next: (res: any) => {

            this.admin = res;

            this.editMode = false;

            alert("Profile Updated Successfully");

          },

          error: err => {

            console.log(err);

            alert("Unable to update profile");

          }

        });

  }

  loadAdminStatistics() {

  this.userService
      .getAdminStatistics()
      .subscribe({

        next: (res: any) => {

          this.stats = {

            booksAdded: res.totalBooks,

            usersManaged: res.totalUsers,

            genresCreated: res.totalGenres,

            reservationsApproved: res.totalReservations,

            finesWaived: res.totalFinesWaived

          };

        },

        error: err => {

          console.log(err);

        }

      });

}


  getEmployeeId(): string {

  if (!this.admin?.id) {
    return '-';
  }

  return 'ADM' + this.admin.id.toString().padStart(3, '0');

}


avatarDialogOpen = false;

getInitials(): string {

  if (!this.admin?.fullName) {
    return 'AD';
  }

  const names = this.admin.fullName.trim().split(' ');

  if (names.length === 1) {
    return names[0].substring(0, 2).toUpperCase();
  }

  return (
    names[0][0] +
    names[1][0]
  ).toUpperCase();

}

openAvatarDialog() {
  this.avatarDialogOpen = true;
}

closeAvatarDialog() {
  this.avatarDialogOpen = false;
}

handleAvatarUpload(event: any): void {

  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {

    const base64 = reader.result as string;

    this.userService
      .uploadProfileImage(base64)
      .subscribe({

        next: () => {

          this.admin.profileImage = base64;

          this.avatarDialogOpen = false;

          this.loadProfile();

        }

      });

  };

  reader.readAsDataURL(file);

}

}
