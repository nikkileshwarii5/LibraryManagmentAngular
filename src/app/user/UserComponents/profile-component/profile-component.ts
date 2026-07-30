import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { UserService } from '../../../services/UserService';
import { UserProfile } from '../../../models/UserProfile';

@Component({
  selector: 'app-profile-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

  
   
  ],
  templateUrl: './profile-component.html',
  styleUrls: ['./profile-component.css']
})
export class ProfileComponent implements OnInit {

  loading = true;

  user: any = {};

  isEditing = false;

  avatarDialogOpen = false;

  snackbarMessage = '';

  alertMessage = '';
alertType = 'success';
showAlert = false;



  formData = {
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    bio: ''
  };

  // achievements = [
  //   {
  //     id: 1,
  //     title: 'Bookworm',
  //     description: 'Read 50 books',
  //     earned: true
  //   },
  //   {
  //     id: 2,
  //     title: 'Speed Reader',
  //     description: 'Read 10 books in a month',
  //     earned: true
  //   },
  //   {
  //     id: 3,
  //     title: 'Diverse Reader',
  //     description: 'Read 5 different genres',
  //     earned: true
  //   },
  //   {
  //     id: 4,
  //     title: 'Early Bird',
  //     description: 'Return 10 books early',
  //     earned: false
  //   },
  //   {
  //     id: 5,
  //     title: 'Marathon Reader',
  //     description: 'Read for 30 days straight',
  //     earned: false
  //   },
  //   {
  //     id: 6,
  //     title: 'Century Club',
  //     description: 'Read 100 books',
  //     earned: false
  //   }
  // ];


  achievements:any[]=[];
  constructor(
    private userService: UserService,private cdr: ChangeDetectorRef
   
  ) {}

  ngOnInit(): void {
    this.loadProfile();

     this.loadAchievements();
  }

  loadProfile(): void {

    this.userService.getProfile().subscribe({
      next: (response: any) => {

        console.log('Profile Response:', response);

        this.user = response;

        this.formData = {
          fullName: response.fullName || '',
          email: response.email || '',
          phone: response.phone || '',
          dateOfBirth: response.dateOfBirth || '',
          address: response.address || '',
          bio: response.bio || ''
        };

        this.loading = false;
         this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);

        this.loading = false;

        this.showSnackbar(
          'Failed to load profile',
          'error'
        );
         this.cdr.detectChanges();
      }
    });
  }


  loadAchievements(){

    this.userService
        .getAchievements()
        .subscribe({

            next:(res:any)=>{

                this.achievements=res;

            }

        });

}

  getInitial(): string {

    if (!this.formData.fullName) {
      return 'U';
    }

    return this.formData.fullName
      .charAt(0)
      .toUpperCase();
  }

  getMembershipColor(tier: string): string {

    switch (tier) {

      case 'Gold':
        return '#F59E0B';

      case 'Silver':
        return '#9CA3AF';

      case 'Bronze':
        return '#CD7F32';

      default:
        return '#4F46E5';
    }
  }

handleSave(): void {

  this.userService
    .updateProfile(this.formData)
    .subscribe({

      next: (response: any) => {

        this.user = response;

        this.isEditing = false;

        this.showSnackbar(
          'Profile updated successfully!',
          'success'
        );

        this.loadProfile();
      },

      error: (err) => {

        console.error(err);

        this.showSnackbar(
          'Failed to update profile',
          'error'
        );
      }

    });
}

  handleCancel(): void {

    this.formData = {
      fullName: this.user?.fullName || '',
      email: this.user?.email || '',
      phone: this.user?.phone || '',
      dateOfBirth: this.user?.dateOfBirth || '',
      address: this.user?.address || '',
      bio: this.user?.bio || ''
    };

    this.isEditing = false;
  }

  openAvatarDialog(): void {
    this.avatarDialogOpen = true;
  }

  closeAvatarDialog(): void {
    this.avatarDialogOpen = false;
  }

  // handleAvatarUpload(event: any): void {

  //   const file = event.target.files[0];

  //   if (file) {

  //     this.showSnackbar(
  //       'Avatar updated successfully!',
  //       'success'
  //     );

  //     this.avatarDialogOpen = false;
  //   }
  // }

  handleAvatarUpload(event: any): void {

  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {

    const base64 =
      reader.result as string;

    this.userService
      .uploadProfileImage(base64)
      .subscribe({

        next: () => {

          this.user.profileImage = base64;

          this.avatarDialogOpen = false;

          this.showSnackbar(
            'Profile image updated',
            'success'
          );

          setTimeout(() => {
    this.loadProfile();
  }, 500);


        }

      });

  };

  reader.readAsDataURL(file);

}

showSnackbar(
  message: string,
  type: string = 'success'
): void {

  this.alertMessage = message;
  this.alertType = type;
  this.showAlert = true;

  setTimeout(() => {
    this.showAlert = false;
  }, 4000);
}
}