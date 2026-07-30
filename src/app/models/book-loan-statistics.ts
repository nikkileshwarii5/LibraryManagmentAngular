export interface BookLoanStatistics {
  bookId: number;
  totalBorrows: number;
  uniqueBorrowers: number;
  lastBorrowedDate: string;
  averageRating: number;
}