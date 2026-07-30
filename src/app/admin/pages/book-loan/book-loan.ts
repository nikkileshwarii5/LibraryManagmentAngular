import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import { BookLoanService } from '../../../services/book-loan.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-loan',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './book-loan.html',
  styleUrl: './book-loan.css',
})
export class BookLoan implements OnInit {

  allLoans: any[] = [];
  loading = false;
  totalElements = 0;

  // Filters
  searchQuery = '';
  filterStatus = '';
  page = 0;
  rowsPerPage = 20;

  userId = '';
  bookId = '';
  overdueOnly = false;
  unpaidFinesOnly = false;
  startDate: any = null;
  endDate: any = null;
  sortBy = 'createdAt';
  sortDirection = 'DESC';

  // Dialog states
  filterModalOpen = false;
  extendDialogOpen = false;
  editDialogOpen = false;
  createFineDialogOpen = false;

  selectedLoan: any = null;
  extensionDays = 7;

  fineType = '';
  editFormData: any = {};
  createFineFormData: any = {};
  sortByOpen = false;
  sortDirOpen = false;
  constructor(private service: BookLoanService,private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans() {
    this.loading = true;

    const req: any = {
      page: this.page,
      size: this.rowsPerPage,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection
    };

    if (this.userId) req.userId = +this.userId;
    if (this.bookId) req.bookId = +this.bookId;
    if (this.filterStatus) req.status = this.filterStatus;
    if (this.overdueOnly) req.overdueOnly = true;
    if (this.unpaidFinesOnly) req.unpaidFinesOnly = true;
    if (this.startDate) req.startDate = dayjs(this.startDate).format('YYYY-MM-DD');
    if (this.endDate) req.endDate = dayjs(this.endDate).format('YYYY-MM-DD');

    this.service.getAllLoans(req).subscribe((res: any) => {
      this.allLoans = res.content || [];
      this.totalElements = res.totalElements;
      this.loading = false;

       this.cd.detectChanges();
    });
  }

  handleReturn(loan: any) {
    if (confirm(`Mark loan #${loan.id} as returned?`)) {
      // this.service.checkin({ bookLoanId: loan.id }).subscribe(() => {
      //   this.loadLoans();
      // });

      this.service.approveReturn({bookLoanId: loan.id}).subscribe(()=>{
      this.loadLoans();
      });
    }
  }

  handleExtend() {
    this.service.renew({
      bookLoanId: this.selectedLoan.id,
      extensionDays: this.extensionDays
    }).subscribe(() => {
      this.extendDialogOpen = false;
      this.loadLoans();
    });
  }

  handleUpdateLoan() {
    const updateRequest: any = {};

    if (this.editFormData.status) updateRequest.status = this.editFormData.status;
    if (this.editFormData.dueDate)
      updateRequest.dueDate = dayjs(this.editFormData.dueDate).format('YYYY-MM-DD');

    if (this.editFormData.returnDate)
      updateRequest.returnDate = dayjs(this.editFormData.returnDate).format('YYYY-MM-DD');

    if (this.editFormData.maxRenewals)
      updateRequest.maxRenewals = +this.editFormData.maxRenewals;

    if (this.editFormData.fineAmount)
      updateRequest.fineAmount = +this.editFormData.fineAmount;

    updateRequest.finePaid = this.editFormData.finePaid;

    if (this.editFormData.notes)
      updateRequest.notes = this.editFormData.notes;

    this.service.updateLoan(this.selectedLoan.id, updateRequest)
      .subscribe(() => {
        this.editDialogOpen = false;
        this.loadLoans();
      });
  }

  handleCreateFine() {
    if (!this.createFineFormData.amount) {
      alert('Enter amount');
      return;
    }

    this.service.createFine({
      bookLoanId: this.selectedLoan.id,
      type: this.fineType,
      amount: +this.createFineFormData.amount,
      // reason: this.createFineFormData.reason,
       reason: this.fineType === 'LOSS'
          ? 'Book lost by borrower'
          : this.createFineFormData.reason,

      notes: this.createFineFormData.notes
    }).subscribe(() => {

      this.service.updateLoan(this.selectedLoan.id, {
        status: this.fineType === 'DAMAGE' ? 'DAMAGED' : 'LOST'
      }).subscribe(() => {
        this.createFineDialogOpen = false;
        this.loadLoans();
      });

    });
  }


  sortByOptions = [
  { label: 'Created Date', value: 'createdAt' },
  { label: 'Due Date', value: 'dueDate' },
  { label: 'Return Date', value: 'returnDate' }
];

toggleSortBy() {
  this.sortByOpen = !this.sortByOpen;
  this.sortDirOpen = false;
}

toggleSortDir() {
  this.sortDirOpen = !this.sortDirOpen;
  this.sortByOpen = false;
}

selectSortBy(value: string, e: Event) {
  e.stopPropagation();
  this.sortBy = value;
  this.sortByOpen = false;
  this.loadLoans();
}

selectSortDir(value: string, e: Event) {
  e.stopPropagation();
  this.sortDirection = value;
  this.sortDirOpen = false;
  this.loadLoans();
}

getSortByLabel() {
  return this.sortByOptions.find(o => o.value === this.sortBy)?.label || 'Select';
}



confirmLost(row: any) {

  if (!confirm(`Confirm that "${row.bookTitle}" is permanently lost?`)) {
    return;
  }

  this.service.updateLoan(row.id, {
    status: 'LOST'
  }).subscribe({

    next: () => {

      alert('Book marked as LOST successfully.');

      this.loadLoans();

    },

    error: (err) => {

      alert(err?.error?.message || 'Failed to update status.');

    }

  });

}


getEndRecord(): number {
  return Math.min((this.page + 1) * this.rowsPerPage, this.totalElements);
}


get totalPages(): number {
  return Math.ceil(this.totalElements / this.rowsPerPage);
}

changePage(page: number) {
  if (page < 0 || page >= this.totalPages) {
    return;
  }

  this.page = page;
  this.loadLoans();
}

nextPage() {
  if (this.page < this.totalPages - 1) {
    this.page++;
    this.loadLoans();
  }
}

previousPage() {
  if (this.page > 0) {
    this.page--;
    this.loadLoans();
  }
}

get pageNumbers(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i);
}

changePageSize(event: Event) {
  const value = +(event.target as HTMLSelectElement).value;
  this.rowsPerPage = value;
  this.page = 0;
  this.loadLoans();
}
}
