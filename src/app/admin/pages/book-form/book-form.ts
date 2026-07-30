import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../../services/book.service';
import { GenreService } from '../../../services/genre.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css'
})
export class BookForm implements OnInit, OnChanges {

  @Input() book: any;
  @Output() close = new EventEmitter();

  formData: any = {
    isbn: '',
    title: '',
    author: '',
    genreId: '',
    publisher: '',
    publicationDate: '',
    language: '',
    pages: '',
    description: '',
    totalCopies: 1,
    availableCopies: 1,
    price: '',
    coverImageUrl: ''
  };

  genres: any[] = [];
  uploading = false;
  uploadError: string | null = null;

  constructor(
    private service: BookService,
    private genreService: GenreService
  ) {}

  // ✅ Load genres only once
  ngOnInit() {
    this.genreService.getGenres().subscribe(res => {
      this.genres = res || [];
    });
  }

  // ✅ THIS IS THE MAIN FIX (instant form update)
  ngOnChanges(changes: SimpleChanges) {
    if (changes['book'] && this.book) {
      this.formData = {
         id: this.book.id,
        isbn: this.book.isbn || '',
        title: this.book.title || '',
        author: this.book.author || '',
        genreId: this.book.genreId || '',
        publisher: this.book.publisher || '',
        publicationDate: this.book.publicationDate || '',
        language: this.book.language || '',
        pages: this.book.pages || '',
        description: this.book.description || '',
        totalCopies: this.book.totalCopies || 1,
        availableCopies: this.book.availableCopies || 1,
        price: this.book.price || '',
        coverImageUrl: this.book.coverImageUrl || ''
      };
    }
  }

  // ✅ Submit
  submit() {

  if (!this.formData.genreId) {
    alert("Please select genre");
    return;
  }

  const payload = {
    isbn: this.formData.isbn,
    title: this.formData.title,
    author: this.formData.author,
    publisher: this.formData.publisher || null,
    publicationDate: this.formData.publicationDate || null,
    language: this.formData.language || null,
    description: this.formData.description || null,
    coverImageUrl: this.formData.coverImageUrl || null,

    pages: this.formData.pages ? Number(this.formData.pages) : null,
    price: this.formData.price ? Number(this.formData.price) : null,
    totalCopies: Number(this.formData.totalCopies),
    availableCopies: Number(this.formData.availableCopies),
    genreId: Number(this.formData.genreId)
  };

  

  // ✅ THIS IS THE MAIN FIX
  if (this.formData.id) {
    console.log("CALLING UPDATE API");

    this.service.updateBook(this.formData.id, payload).subscribe({
      next: () => {
        // alert("Book details are updated successfully ✅");
        this.close.emit('updated');
      },
       error: (err) => console.log("UPDATE ERROR:", err)
    });

  } else {

    this.service.createBook(payload).subscribe({
      next: () => this.close.emit('created'),
      error: (err) => console.log("CREATE ERROR:", err)
    });
  }
}

  // ✅ Image Upload
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.uploadError = 'Only images allowed';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.uploadError = 'Max 5MB allowed';
      return;
    }

    this.uploading = true;
    this.uploadError = null;

    const reader = new FileReader();
    reader.onload = () => {
      this.formData.coverImageUrl = reader.result;
      this.uploading = false;
    };
    reader.readAsDataURL(file);
  }
}