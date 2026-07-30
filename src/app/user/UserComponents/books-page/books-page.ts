import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  debounceTime,
  distinctUntilChanged,
  Subject
} from 'rxjs';

import { Layout } from '../Layout/layout/layout';
import { BookCard } from '../book-card/book-card';
import { GenreFilter } from '../genre-filter/genre-filter';
import { BookSkeletonGrid } from '../book-skeleton/book-skeleton-grid/book-skeleton-grid';

import { BookService } from '../../../services/book.service';
import { GenreService } from '../../../services/genre.service';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    
    BookCard,
    GenreFilter,
    BookSkeletonGrid
  ],
  templateUrl: './books-page.html',
  styleUrl: './books-page.css',
})
export class BooksPage implements OnInit {

  books: any[] = [];

  genres: any[] = [];

  loading = false;

  genresLoading = false;

  error: string | null = null;

  searchTerm = '';

  selectedGenreId: number | null = null;

  availabilityFilter = 'ALL';

  sortBy = 'createdAt';

  sortDirection = 'DESC';
activeDropdown: string | null = null;
  showMobileFilters = false;

  snackbar = {
    open: false,
    message: '',
    severity: 'success'
  };

  currentPage = 1;
pageSize = 9;      // 9 books per page
totalPages = 0;
totalElements = 0;

  private searchSubject =
    new Subject<string>();

  constructor(
    private booksService: BookService,
    private genreService: GenreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {

      this.loadBooks();

    });

    this.fetchGenres();

    this.loadBooks();

  }

  fetchGenres() {

    this.genresLoading = true;

    this.genreService
      .fetchActiveGenres()
      .subscribe({

        next: (res: any) => {

          this.genres =
            [...(res?.content || res)];

          this.genresLoading = false;

          this.cdr.detectChanges();

        },

        error: () => {

          this.genresLoading = false;

          this.cdr.detectChanges();

        }

      });

  }

  loadBooks() {

    this.loading = true;

    this.error = null;

    this.cdr.detectChanges();

    const payload = {

      genreId: this.selectedGenreId,

      availableOnly:
        this.availabilityFilter === 'AVAILABLE'
          ? true
          : this.availabilityFilter === 'CHECKED_OUT'
          ? false
          : null,

      // page: 0,

      // size: 20,

      // sortBy: this.sortBy,

      // sortDirection: this.sortDirection

      page: this.currentPage - 1,

  size: this.pageSize,

  sortBy: this.sortBy,

  sortDirection: this.sortDirection
    };

    const request = this.searchTerm
      ? this.booksService.searchBooks({
          ...payload,
          searchTerm: this.searchTerm
        })
      : this.booksService.getBooks(payload);

    request.subscribe({

      next: (res: any) => {

        // this.books =[...(res?.content || res)];

        this.books = res.content || [];

this.totalPages = res.totalPages;

this.totalElements = res.totalElements;

        this.loading = false;

        this.cdr.detectChanges();

      },

      error: (err) => {

        this.error = err;

        this.loading = false;

        this.cdr.detectChanges();

      }

    });

  }



  onSearchChange() {

  this.currentPage = 1;

  this.searchSubject.next(this.searchTerm);

}

  handleGenreSelect(id: number | null) {

    // this.selectedGenreId = id;

    // this.loadBooks();

    this.selectedGenreId = id;

this.currentPage = 1;

this.loadBooks();

  }

  handleSortChange(
    value: string
  ) {

    const [field, direction] =
      value.split('-');

    this.sortBy = field;

    this.sortDirection =
      direction.toUpperCase();

    this.loadBooks();

  }

  onAvailabilityChange() {

    this.loadBooks();

  }

  getCurrentSortValue(): string {

    return `${this.sortBy}-${this.sortDirection.toLowerCase()}`;

  }

  closeSnackbar() {

    this.snackbar.open = false;

  }

  toggleDropdown(type: string) {

  this.activeDropdown =
    this.activeDropdown === type
      ? null
      : type;

}
getSortLabel(): string {

  const value =
    this.getCurrentSortValue();

  switch (value) {

    case 'title-asc':
      return 'Title (A-Z)';

    case 'title-desc':
      return 'Title (Z-A)';

    case 'author-asc':
      return 'Author (A-Z)';

    case 'author-desc':
      return 'Author (Z-A)';

    case 'createdAt-desc':
      return 'Newest First';

    case 'createdAt-asc':
      return 'Oldest First';

    default:
      return 'Sort';
  }

}
setAvailability(value: string) {

  // this.availabilityFilter = value;

  // this.onAvailabilityChange();

  


  this.availabilityFilter = value;

this.currentPage = 1;

this.onAvailabilityChange();

 this.activeDropdown = null;

}


changePage(page: number) {

  if (page < 1 || page > this.totalPages) {
    return;
  }

  this.currentPage = page;

  this.loadBooks();

}
}