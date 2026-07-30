// export const columns = [
//   { field: 'coverImage', headerName: 'Cover', type: 'image' },
//   { field: 'title', headerName: 'Title' },
//   { field: 'author', headerName: 'Author' },
//   { field: 'isbn', headerName: 'ISBN' },
//   { field: 'genreName', headerName: 'Genre', type: 'genreChip' },
//   { field: 'totalCopies', headerName: 'Total Copies', align: 'center' },
//   { field: 'availableCopies', headerName: 'Available', align: 'center', type: 'availabilityChip' },
//   { field: 'publishedYear', headerName: 'Year', align: 'center', type: 'yearChip' }
// ];


export const columns = [
  { headerName: 'Cover', field: 'coverImageUrl', type: 'image', minWidth: 80 },
  { headerName: 'Title', field: 'title', minWidth: 180 },
  { headerName: 'Author', field: 'author', minWidth: 160 },
  { headerName: 'ISBN', field: 'isbn', minWidth: 150 },
  { headerName: 'Genre', field: 'genreName', type: 'genreChip', minWidth: 140 },
  { headerName: 'Total Copies', field: 'totalCopies', minWidth: 120 },
  { headerName: 'Available', field: 'availableCopies', type: 'availabilityChip', minWidth: 120 },
  { headerName: 'Year', field: 'publicationDate', type: 'yearChip', minWidth: 100 } // 🔥 THIS WAS MISSING
];