// genre-filter.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-genre-filter',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './genre-filter.html',
  styleUrls: ['./genre-filter.css']
})
export class GenreFilter {
  @Input() genres: any[] = [];
@Input() selectedGenreId: number | null = null;

  @Output() genreSelect = new EventEmitter<number | null>();
expandedGenres: Set<number> = new Set();

  toggleGenre(genreId: number) {
    if (this.expandedGenres.has(genreId)) {
      this.expandedGenres.delete(genreId);
    } else {
      this.expandedGenres.add(genreId);
    }
  }

  isExpanded(genreId: number): boolean {
    return this.expandedGenres.has(genreId);
  }

  onGenreSelect(id: number | null) {
    this.genreSelect.emit(id);
  }
}