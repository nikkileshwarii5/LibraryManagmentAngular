import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTable } from '../data-table/data-table';
import { MatIconModule } from '@angular/material/icon';
import { columns } from './table-columns';
import { BookService } from '../../../services/book.service';
import { BookForm } from '../book-form/book-form';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { GenreService } from '../../../services/genre.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,FormsModule,DataTable,MatIconModule,BookForm, MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books implements OnInit {
  columns = columns;
  books: any[] = [];
  searchTerm = '';
 selectedGenreId: any = '';   // or number | ''
  availabilityFilter = '';
  dialogOpen = false;
  editingBook: any = null;
  sortValue = 'createdAt-desc';
  sortBy = 'createdAt';
  sortDirection = 'DESC';
  activeDropdown: string | null = null;
  genres: any[] = [];


  currentPage = 0;
pageSize = 20;
totalElements = 0;
totalPages = 0;

  constructor(private bookService: BookService,private router: Router, private cd: ChangeDetectorRef, private genreService: GenreService, private snackBar: MatSnackBar) {}

ngOnInit() {
  this.loadBooks();

  // ✅ LOAD GENRES FROM BACKEND
  this.genreService.getGenres().subscribe(res => {
    this.genres = res || [];
  });
}
  loadBooks() {
    const params = {
      searchTerm: this.searchTerm || null,
      genreId: this.selectedGenreId || null,
      availableOnly:
        this.availabilityFilter === 'AVAILABLE'
          ? true
          : this.availabilityFilter === 'CHECKED_OUT'
          ? false
          : null,

      page: this.currentPage,
    size: this.pageSize,
    sortBy: this.sortBy,
    sortDirection: this.sortDirection
    };

  this.bookService.searchBooks(params).subscribe(res => {
  this.books = res.content || [];

  // ✅ Save pagination data
    this.currentPage = res.pageNumber;
    this.pageSize = res.pageSize;
    this.totalPages = res.totalPages;
    this.totalElements = res.totalElements;
  this.cd.detectChanges(); 
});
  }
 
  openDialog(book: any = null) {
    this.editingBook = book;
    this.dialogOpen = true;
  }

onDialogClose(result?: any) {

  this.dialogOpen = false;
  this.loadBooks();

  if (result === 'created') {

    this.snackBar.open(
      '📚 Book added successfully!',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      }
    );

  }

  if (result === 'updated') {

    this.snackBar.open(
      '✏️ Book updated successfully!',
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        panelClass: ['info-snackbar']
      }
    );

  }

}

  deleteBook(book: any) {
    if (confirm(`Delete ${book.title}?`)) {
      this.bookService.deleteBook(book.id).subscribe(() => {
        this.loadBooks();
      });
    }
  }
  onSortChange() {
  const [field, direction] = this.sortValue.split('-');
  this.sortBy = field;
  this.sortDirection = direction.toUpperCase();
  this.loadBooks();
}

clearFilters() {
  this.searchTerm = '';
  this.selectedGenreId = '';
  this.availabilityFilter = '';
  this.sortValue = 'createdAt-desc';
  this.sortBy = 'createdAt';
  this.sortDirection = 'DESC';
  this.loadBooks();
}






toggleDropdown(type: string) {
  this.activeDropdown = this.activeDropdown === type ? null : type;
}

/* -------- AVAILABILITY -------- */
selectAvailability(value: string) {
  this.availabilityFilter = value;
  this.activeDropdown = null;
  this.currentPage = 0;
  this.loadBooks();
}

getAvailabilityLabel() {
  if (!this.availabilityFilter) return '';   // ✅ placeholder

  if (this.availabilityFilter === 'AVAILABLE') return 'Available';
  if (this.availabilityFilter === 'CHECKED_OUT') return 'Checked Out';

  return '';
}

/* -------- SORT -------- */
selectSort(value: string) {
  this.sortValue = value;
  this.activeDropdown = null;
  this.currentPage = 0;
  this.onSortChange();
}

getSortLabel() {
  switch (this.sortValue) {
    case 'title-asc': return 'Title (A-Z)';
    case 'title-desc': return 'Title (Z-A)';
    case 'author-asc': return 'Author (A-Z)';
    case 'author-desc': return 'Author (Z-A)';
    case 'createdAt-desc': return 'Newest First';
    case 'createdAt-asc': return 'Oldest First';
    default: return 'Newest First';
  }
}

// @HostListener('document:click', ['$event'])
// handleClickOutside(event: any) {
//   if (!event.target.closest('.dropdown-wrapper')) {
//     this.activeDropdown = null;
//   }
// }

@HostListener('document:click', ['$event'])
onClickOutside(event: any) {
  const clickedInside = event.target.closest('.dropdown-wrapper');
  if (!clickedInside) {
    this.activeDropdown = null;
  }
}
selectGenre(id: any) {
  this.selectedGenreId = id;
  this.activeDropdown = null;
  this.currentPage = 0;
  this.loadBooks();
}

getGenreName(): string {
  if (!this.selectedGenreId) return '';

  const genre = this.genres.find(g => g.id == this.selectedGenreId);
  return genre ? genre.name : '';
}


nextPage() {
  if (this.currentPage < this.totalPages - 1) {
    this.currentPage++;
    this.loadBooks();
  }
}

previousPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
    this.loadBooks();
  }
}

goToPage(page: number) {
  this.currentPage = page;
  this.loadBooks();
}


changePage(page: number) {
  if (page < 1 || page > this.totalPages) {
    return;
  }

  this.currentPage = page;
  this.loadBooks();
}

}
