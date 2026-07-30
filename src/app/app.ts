import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './landing/navbar/navbar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('library-management-angular');
    constructor(private router: Router) {}

  // showNavbar(): boolean {
  //   const hiddenRoutes = ['/login', '/register', '/oauth2/callback','/add-testimonial','/admin/dashboard','/admin/books','/admin/book-loans','/admin/fines','/admin/reservations','/admin/genres','/admin/users','/admin/subscription-plans','/admin/user-subscriptions','/admin/payments','/user/dashboard','/user/books','/userbooks/:id'];
  //   return !hiddenRoutes.includes(this.router.url);
  // }

  showNavbar(): boolean {

  const hiddenRoutes = [

    '/login',
    '/register',
    '/oauth2/callback',
    '/forgot-password',
    '/auth/reset-password',
    '/add-testimonial',

    '/admin/dashboard',
    '/admin/books',
    '/admin/book-loans',
    '/admin/fines',
    '/admin/reservations',
    '/admin/genres',
    '/admin/users',
    '/admin/subscription-plans',
    '/admin/user-subscriptions',
    '/admin/payments',
    '/admin/profile',
    '/admin/settings',
    '/admin/testimonials',
    

    '/user/dashboard',
    '/user/books',
    '/user/loans',
    '/user/reservations',
    '/user/fines',
    '/user/subscriptions',
    '/user/payment-sucess/',
    '/user/wishlist',
    '/user/profile',
    '/user/settings',
    '/user/notifications',
    '/user/add-testimonial'

  ];

  const currentUrl =
    this.router.url;

  return !(
  hiddenRoutes.includes(currentUrl) ||

  currentUrl.startsWith('/user/books/') ||

  currentUrl.startsWith('/auth/reset-password')
);

    


  

}
}
