import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WishlistCard } from '../wishlist-card/wishlist-card';
import { WishlistService } from '../../../services/WishlistService';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    WishlistCard
  ],
  templateUrl: './wishlist-page.html',
  styleUrl: './wishlist-page.css'
})
export class WishlistPage implements OnInit {

  myWishlist: any[] = [];

  loading = false;

  error = '';

  selectedItems = new Set<number>();

  sortBy = 'dateAdded';

  filterAvailability = 'all';

  clearDialogOpen = false;

  snackbar = {
    open: false,
    message: '',
    severity: 'success'
  };

constructor(
  private wishlistService: WishlistService,
  private cdr: ChangeDetectorRef,
   private router: Router
) {}

  ngOnInit(): void {

    this.loadWishlist();

  }

  loadWishlist() {

  this.loading = true;

  this.wishlistService
    .getMyWishlist(0, 100)
    .subscribe({

      next: (res: any) => {

        console.log('Wishlist API Response:', res);
       
       this.myWishlist =res.content || [];

        this.loading = false;

        this.cdr.detectChanges();

      },

      error: () => {

        this.loading = false;

        this.error =
          'Failed to load wishlist';

        this.cdr.detectChanges();

      }

    });

}

 


  handleRemoveItem(bookId: number) {

  this.wishlistService.removeFromWishlist(bookId).subscribe({

    next: () => {

      this.showSnackbar(
        'Removed from wishlist',
        'success'
      );

      this.loadWishlist();   // Refresh the page data

    },

    error: () => {

      this.showSnackbar(
        'Failed to remove from wishlist',
        'error'
      );

    }

  });

}

  handleReserveBook(bookId: number) {

    console.log('reserve', bookId);

  }



  handleViewBook(bookId: number) {

  this.router.navigate([
    '/user/books',
    bookId
  ]);

}

  handleClearWishlist() {

  this.myWishlist = [];

  this.selectedItems.clear();

  this.clearDialogOpen = false;

  this.showSnackbar(
    'Wishlist cleared',
    'success'
  );

}

  handleSelectItem(itemId: number) {

    const updated =
      new Set(this.selectedItems);

    if (updated.has(itemId)) {

      updated.delete(itemId);

    } else {

      updated.add(itemId);

    }

    this.selectedItems = updated;

  }

  handleSelectAll() {

    if (
      this.selectedItems.size ===
      this.filteredAndSortedItems.length
    ) {

      this.selectedItems =
        new Set();

    } else {

      this.selectedItems =
        new Set(
          this.filteredAndSortedItems.map(
            item => item.id
          )
        );

    }

  }

  handleBulkRemove() {

    console.log(
      Array.from(this.selectedItems)
    );

  }

  handleBulkReserve() {

    console.log(
      Array.from(this.selectedItems)
    );

  }

 
  handleShare() {

  const text =
    this.myWishlist
      .map(
        item =>
          `${item.book.title} by ${item.book.author}`
      )
      .join('\n');

  if (navigator.share) {

    navigator.share({

      title: 'My Wishlist',

      text: text

    });

  } else {

    navigator.clipboard.writeText(text);

    this.showSnackbar(
      'Wishlist copied to clipboard!',
      'success'
    );

  }

}
  

  get filteredAndSortedItems() {

    return [...this.myWishlist]

      .filter(item => {

        if (
          this.filterAvailability ===
          'available'
        ) {

          return (
            item.book.availableCopies > 0
          );

        }

        if (
          this.filterAvailability ===
          'unavailable'
        ) {

          return (
            item.book.availableCopies === 0
          );

        }

        return true;

      })

      .sort((a, b) => {

        switch (this.sortBy) {

          case 'dateAdded':

            return (
              new Date(b.addedAt).getTime() -
              new Date(a.addedAt).getTime()
            );

          case 'title':

            return a.book.title.localeCompare(
              b.book.title
            );

          case 'author':

            return a.book.author.localeCompare(
              b.book.author
            );

          default:

            return 0;

        }

      });

  }

  showSnackbar(
    message: string,
    severity = 'success'
  ) {

    this.snackbar = {

      open: true,

      message,

      severity

    };

    this.cdr.detectChanges();

    setTimeout(() => {

      this.snackbar.open = false;

      this.cdr.detectChanges();

    }, 4000);

  }

}