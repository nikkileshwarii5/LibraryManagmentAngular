import { Component, OnInit } from '@angular/core';
import { GenreService } from '../../../services/genre.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-genres',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './genres.html',
  styleUrl: './genres.css',
})
export class Genres  implements OnInit{
  genres: any[] = [];
  loading = false;

  dialogOpen = false;
  editingGenre: any = null;
  searchTerm = '';
  errorMessage: string = '';

  formData: any = {
    code: '',
    name: '',
    description: '',
    displayOrder: null,
    parentId: null,
    active: true
  };

  constructor(private service: GenreService,private cd: ChangeDetectorRef, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadGenres();
  }

loadGenres() {
  this.service.getGenres().subscribe(res => {
    this.genres = res;
    this.cd.detectChanges(); // 🔥 force UI update
  });
}
  handleSearch() {
    if (!this.searchTerm.trim()) {
      this.loadGenres();
      return;
    }

    this.service.searchGenres({
      term: this.searchTerm,
      page: 0,
      size: 100,
      sortBy: 'displayOrder',
      sortDir: 'ASC'
    }).subscribe(res => {
      this.genres = res.content;
    });
  }

  handleOpenDialog(genre: any = null) {
    if (genre) {
      this.editingGenre = genre;
      this.formData = { ...genre };
    } else {
      this.editingGenre = null;
      this.formData = {
        code: '',
        name: '',
        description: '',
        displayOrder: null,
        parentId: null,
        active: true
      };
    }
    this.dialogOpen = true;
  }

  handleCloseDialog() {
    this.dialogOpen = false;
    this.editingGenre = null;
  }

  // handleSubmit() {
  //   if (this.editingGenre) {
  //     this.service.updateGenre(this.editingGenre.id, this.formData)
  //       .subscribe(() => this.loadGenres());
  //   } else {
  //     this.service.createGenre(this.formData)
  //       .subscribe(() => this.loadGenres());
  //   }

  //   this.handleCloseDialog();
  // }

//   handleSubmit() {

//   this.errorMessage = ''; // reset

//   const nameExists = this.genres.some(g =>
//     g.name.toLowerCase().trim() === this.formData.name.toLowerCase().trim()
//   );

//   if (!this.editingGenre && nameExists) {
//     this.errorMessage = "Genre Name already exists. Please create another.";
//     return;
//   }

//   const payload = {
//     ...this.formData,
//     code: this.formData.code?.toUpperCase(),
//     parentId: this.formData.parentId || null,
//     displayOrder: this.formData.displayOrder || 0
//   };

//   if (this.editingGenre) {
//     this.service.updateGenre(this.editingGenre.id, payload)
//       .subscribe(() => this.loadGenres());
//   } else {
//     this.service.createGenre(payload)
//       .subscribe(() => this.loadGenres());
//   }

//   this.handleCloseDialog();
// }


handleSubmit() {

  this.errorMessage = '';

  const nameExists = this.genres.some(g =>
    g.name.toLowerCase().trim() === this.formData.name.toLowerCase().trim()
  );

  if (!this.editingGenre && nameExists) {
    this.errorMessage = "Genre Name already exists. Please create another.";
    return;
  }

  const payload = {
    ...this.formData,
    code: this.formData.code?.toUpperCase(),
    parentId: this.formData.parentId || null,
    displayOrder: this.formData.displayOrder || 0
  };

  if (this.editingGenre) {

    this.service.updateGenre(this.editingGenre.id, payload)
      .subscribe(() => {

        this.loadGenres();

        this.snackBar.open(
          '✏️ Genre updated successfully!',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['info-snackbar']
          }
        );

        this.handleCloseDialog();

      });

  } else {

    this.service.createGenre(payload)
      .subscribe(() => {

        this.loadGenres();

        this.snackBar.open(
          '📚 Genre added successfully!',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          }
        );

        this.handleCloseDialog();

      });

  }

}

  handleDelete(row: any) {
    if (confirm(`Delete "${row.name}"?`)) {
      this.service.deleteGenre(row.id)
        .subscribe(() => this.loadGenres());
    }
  }

  getRootGenres() {
    return this.genres.filter(g => !g.parentId);
  }
}
