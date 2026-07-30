export interface UserProfile {
  id: number;
  email: string;
  password: string | null;
  phone: string;
  fullName: string;
  role: string;
  username: string;
  lastLogin: string;

  dateOfBirth: string | null;
  address: string | null;
  bio: string | null;

  totalBooksRead: number;
  currentStreak: number;
  favoriteGenre: string;
  points: number;
  membershipTier: string;
}