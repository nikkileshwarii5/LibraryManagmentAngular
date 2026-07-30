import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FineService } from '../../../services/fine.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-fines',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './fines.html',
  styleUrl: './fines.css',
})
export class Fines implements OnInit {
  allFines: any[] = [];
  loading = false;

  totalElements = 0;
  

  totalCollected = 0;
  totalOutstanding = 0;

  // Filters
  filterStatus = '';
  filterType = '';
  filterUserId: any = '';
  

  page = 0;
  rowsPerPage = 20;

  
  

  // Dialogs
  filterModalOpen = false;
  waiveDialogOpen = false;

  selectedFine: any = null;
  waiveReason = '';

  constructor(private fineService: FineService,  private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadFines();
    this.loadStatistics();
     this.cd.detectChanges();
  }

  loadFines() {
    const params: any = {
      page: this.page,
      size: this.rowsPerPage
    };

    if (this.filterStatus) params.status = this.filterStatus;
    if (this.filterType) params.type = this.filterType;
    if (this.filterUserId) params.userId = this.filterUserId;

    this.loading = true;

    this.fineService.getAllFines(params).subscribe({
      next: (res) => {
        this.allFines = res.content;
        this.totalElements = res.totalElements;
        // this.totalPages = res.totalPages;
        // this.currentPage = res.number;
        this.page = res.number;
        this.loading = false;

         this.cd.detectChanges();
      },
      error: () => {
        this.loading = false,
         this.cd.detectChanges();
      }
    });
  }

  loadStatistics() {
    this.fineService.getTotalCollected().subscribe(res => {
      this.totalCollected = res.total;
       this.cd.detectChanges();
    });

    this.fineService.getTotalOutstanding().subscribe(res => {
      this.totalOutstanding = res.total;
       this.cd.detectChanges();
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
  this.loadFines();
}

nextPage() {
  if (this.page < this.totalPages - 1) {
    this.page++;
    this.loadFines();
  }
}

previousPage() {
  if (this.page > 0) {
    this.page--;
    this.loadFines();
  }
}

get pageNumbers(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i);
}

changePageSize(event: Event) {
  const value = +(event.target as HTMLSelectElement).value;
  this.rowsPerPage = value;
  this.page = 0;
  this.loadFines();
}

  handlePayFine(fine: any) {
    if (confirm(`Pay fine #${fine.id} (Amount: $${fine.amountOutstanding})?`)) {
      this.fineService.payFine(fine.id).subscribe((res: any) => {
        window.location.href = res?.checkoutUrl;
      });
    }
  }

  handleOpenWaiveDialog(fine: any) {
    this.selectedFine = fine;
    this.waiveReason = '';
    this.waiveDialogOpen = true;
  }

  handleWaiveFine() {
    if (!this.waiveReason.trim()) {
      alert('Provide reason');
      return;
    }

    this.fineService.waiveFine({
      fineId: this.selectedFine.id,
      reason: this.waiveReason
    }).subscribe(() => {
      this.waiveDialogOpen = false;
      this.loadFines();
      this.loadStatistics();
    });
  }

  handleDeleteFine(fine: any) {
    if (confirm(`Delete fine #${fine.id}?`)) {
      this.fineService.deleteFine(fine.id).subscribe(() => {
        this.loadFines();
        this.loadStatistics();
      });
    }
  }

  handleApplyFilters() {
    this.page = 0;
    this.filterModalOpen = false;
    this.loadFines();
  }

  handleClearFilters() {
    this.filterStatus = '';
    this.filterType = '';
    this.filterUserId = '';
    this.page = 0;
    this.filterModalOpen = false;
    this.loadFines();
  }
}
