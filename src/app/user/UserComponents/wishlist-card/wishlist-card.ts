import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wishlist-card',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './wishlist-card.html',
  styleUrl: './wishlist-card.css'
})
export class WishlistCard {

  @Input() item: any;

  @Input() isSelected = false;

  @Input() isAvailable = false;

  @Output() selectItem = new EventEmitter<number>();

  @Output() removeItem = new EventEmitter<number>();

  @Output() reserveBook = new EventEmitter<number>();

  @Output() viewBook = new EventEmitter<number>();

}