import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/UserService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-users',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  usersList: any[] = [];
  usersListLoading = false;
  searchQuery = '';
  selectedUser: any = null;
  viewDialogOpen = false;
 currentPage = 1;
pageSize = 10;
totalPages = 0;

totalElements = 0;

  constructor(private service: UserService, private cd: ChangeDetectorRef ) {}

  ngOnInit() {
    this.loadUsers();
  }



// loadUsers() {
//   this.usersListLoading = true;

//   this.service.getUsersList().subscribe({
//     next: (res) => {
//       this.usersList = res;
//       this.usersListLoading = false;

//       this.cd.detectChanges();   // ✅ FORCE UI UPDATE
//     },
//     error: () => {
//       this.usersListLoading = false;
//       this.cd.detectChanges();   // ✅ also here
//     }
//   });
//   }



loadUsers() {

  this.usersListLoading = true;

  this.service
      .getUsersList(this.currentPage - 1, this.pageSize)
      .subscribe({

        next: (res) => {

          console.log(res);

          this.usersList = res.content;

          this.currentPage = res.number + 1;

          this.pageSize = res.size;

          this.totalPages = res.totalPages;

          this.totalElements = res.totalElements;

          this.usersListLoading = false;

          this.cd.detectChanges();

        },

        error: () => {

          this.usersListLoading = false;

          this.cd.detectChanges();

        }

      });

}




get filteredUsers() {

  return (this.usersList || []).filter(user =>

    this.searchQuery === '' ||

    user.fullName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||

    user.email?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||

    user.phone?.includes(this.searchQuery)

  );

}

  handleViewDetails(user: any) {

  this.service.getUserById(user.id).subscribe({

    next: (res) => {
   
      this.selectedUser = res;
      this.viewDialogOpen = true;

    },

    error: () => {

      alert("Failed to load user details");

    }

  });

}

handleToggleActive(user: any) {
  this.service.toggleUserStatus(user.id).subscribe({
    next: () => {
      this.loadUsers();   // 🔥 reload from DB (correct state)
    },
    error: () => {
      alert('Failed to toggle user');
    }
  });

}



handleUpgradeToAdmin(user: any) {
  this.service.updateUserRole(user.id, 'ROLE_ADMIN').subscribe({
    next: () => {
      user.role = 'ROLE_ADMIN';
    },
    error: () => {
      alert('Failed to update role');
    }
  });
}

handleRemoveAdmin(user: any) {
  this.service.updateUserRole(user.id, 'ROLE_USER').subscribe({
    next: () => {
      user.role = 'ROLE_USER';
    },
    error: () => {
      alert('Failed to update role');
    }
  });
}





changePage(page: number) {

  if (page < 1 || page > this.totalPages) {
    return;
  }

  this.currentPage = page;

  this.loadUsers();

}
}


