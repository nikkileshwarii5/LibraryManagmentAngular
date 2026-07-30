import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-features',
   imports: [CommonModule, MatIconModule],
  standalone : true,
  templateUrl: './features.html',
   styleUrls: ['./features.css']
})
export class Features {
   features = [
    {
      icon: 'search',
      title: 'Smart Book Search',
      description: 'Find your perfect book with our advanced search filters. Search by title, author, genre, or ISBN.',
      color: 'text-primary',
      bgColor: 'bg-primary bg-opacity-10',
      borderColor: '#2563eb'
    },
    {
      icon: 'event',
      title: 'Online Reservation',
      description: 'Reserve books online and pick them up at your convenience. Get instant notifications.',
      color: 'text-success',
      bgColor: 'bg-success bg-opacity-10',
      borderColor: '#10b981'
    },
    {
      icon: 'payment',
      title: 'Secure Payments',
      description: 'Integrated payment gateway for membership fees and fines. Multiple payment options available.',
      color: 'text-purple',
      bgColor: 'bg-light',
      borderColor: '#f59e0b'
    },
    {
      icon: 'people',
      title: 'Digital Membership',
      description: 'Manage your membership digitally. Track borrowed books, due dates, and reading history.',
      color: 'text-danger',
      bgColor: 'bg-danger bg-opacity-10',
      borderColor: '#ef4444'
    },
 {
  icon: 'bookmark',
  title: 'Personal Library',
  description: 'Create your reading lists, save favorites, and get personalized recommendations.',
  color: 'text-purple',
  bgColor: 'icon-purple',
 borderColor: '#06b6d4'
},
    {
      icon: 'security',
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We respect your privacy and protect your information.',
      color: 'text-warning',
      bgColor: 'bg-warning bg-opacity-10',
      borderColor: '#f59e0b'
    }
  ];

 
}