import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookSkeleton } from '../book-skeleton';
@Component({
  selector: 'app-book-skeleton-grid',
  standalone:true,
  imports: [FormsModule,CommonModule,BookSkeleton],
  templateUrl: './book-skeleton-grid.html',
  styleUrl: './book-skeleton-grid.css',
})
export class BookSkeletonGrid {
   @Input() count: number = 8;

  skeletons(): number[] {
    return Array.from({ length: this.count }, (_, index) => index);
  }
}
