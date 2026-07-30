import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-skeleton',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './book-skeleton.html',
  styleUrls: ['./book-skeleton.css']
})
export class BookSkeleton {}
