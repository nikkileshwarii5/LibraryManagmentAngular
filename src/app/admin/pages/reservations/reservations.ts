import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';
import { FormsModule } from '@angular/forms';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-reservations',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css',
})
export class Reservations implements OnInit {
   allReservations: any[] = [];
  loading = false;
  totalElements = 0;
  error: any = null;

  filterStatus: string = '';
filterActiveOnly: string | null = null;

  filterUserId = '';
  filterBookId = '';
cancelDialogOpen = false;
selectedCancelReservation: any = null;
totalPages = 0;
pages: number[] = [];

  page = 0;
  rowsPerPage = 5;

  approveDialogOpen = false;
  selectedReservation: any = null;
activeDropdown: string | null = null;


  constructor(private service: ReservationService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.loading = true;

    this.service.searchReservations({
      page: this.page,
      size: this.rowsPerPage,
      status: this.filterStatus || undefined,
      userId: this.filterUserId || undefined,
      bookId: this.filterBookId || undefined,
      activeOnly:
        this.filterActiveOnly === '' ? undefined : this.filterActiveOnly === 'true'
    }).subscribe({
      next: (res) => {
         console.log(res);
        this.allReservations = res.content;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);

        this.loading = false;

        this.cd.detectChanges();
      },
      error: (err) => {
        this.error = err;
        this.loading = false;

        this.cd.detectChanges();
      }
    });
  }

  handleApprove() {
    this.service.fulfillReservation(this.selectedReservation.id).subscribe(() => {
      this.approveDialogOpen = false;
      this.loadReservations();

      this.cd.detectChanges();
    });
  }



  

openCancelDialog(row: any) {
  this.selectedCancelReservation = row;
  this.cancelDialogOpen = true;
}

confirmCancel() {
  this.service.cancelReservation(this.selectedCancelReservation.id)
    .subscribe(() => {

      this.cancelDialogOpen = false;
      this.loadReservations();
      this.cd.detectChanges();

    });
}

  openApproveDialog(row: any) {
    this.selectedReservation = row;
    this.approveDialogOpen = true;
  }

  clearFilters() {
    this.filterStatus = '';
    this.filterUserId = '';
    this.filterBookId = '';
    this.filterActiveOnly = '';
    this.page = 0;
    this.loadReservations();

    this.cd.detectChanges();
  }

  getWaitingDays(reservedAt: any): number {
  if (!reservedAt) return 0;

  const reserved = new Date(reservedAt).getTime();
  const today = new Date().getTime();

  const diff = today - reserved;

  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}



getEndRecord(): number {
  return Math.min((this.page + 1) * this.rowsPerPage, this.totalElements);
}

@HostListener('document:click', ['$event'])
onClickOutside(event: any) {
  const clickedInside = event.target.closest('.dropdown-wrapper');
  if (!clickedInside) {
    this.activeDropdown = null;
  }
}

toggleDropdown(type: string) {
  this.activeDropdown = this.activeDropdown === type ? null : type;
}

/* STATUS */
selectStatus(value: string) {
  this.filterStatus = value;
  this.activeDropdown = null;
}

getStatusLabel(): string {
  if (!this.filterStatus) return '';
  return this.filterStatus.charAt(0) + this.filterStatus.slice(1).toLowerCase();
}

/* ACTIVE */
selectActive(value: string) {
  this.filterActiveOnly = value;
  this.activeDropdown = null;
  this.page = 0;
  this.loadReservations();
}

getActiveLabel(): string {
  if (this.filterActiveOnly === 'true') return 'Active Only';
  if (this.filterActiveOnly === 'false') return 'Include Inactive';
  return '';
}
previousPage() {

  if (this.page > 0) {
    this.page--;
    this.loadReservations();
  }

}

nextPage() {

  if (this.page < this.totalPages - 1) {
    this.page++;
    this.loadReservations();
  }

}

goToPage(index: number) {

  this.page = index;
  this.loadReservations();

}

changePageSize(size: number) {

  this.rowsPerPage = size;
  this.page = 0;

  this.loadReservations();

}
}
