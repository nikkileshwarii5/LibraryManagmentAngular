import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();

  footerLinks = {
    library: [
      { name: 'Browse Books', path: '/books' },
      { name: 'New Arrivals', path: '/new-arrivals' },
      { name: 'Popular Books', path: '/popular' },
      { name: 'Categories', path: '/categories' },
    ],
    membership: [
      { name: 'Join Now', path: '/register' },
      { name: 'Plans & Pricing', path: '/pricing' },
      { name: 'Member Benefits', path: '/benefits' },
      { name: 'FAQs', path: '/faqs' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '/careers' },
      { name: 'Blog', path: '/blog' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Accessibility', path: '/accessibility' },
    ],
  };

  socialLinks = [
    { icon: 'bi-github', href: 'https://github.com', label: 'GitHub' },
    { icon: 'bi-linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'bi-twitter', href: 'https://twitter.com', label: 'Twitter' },
    { icon: 'bi-facebook', href: 'https://facebook.com', label: 'Facebook' },
  ];

  contactInfo = [
    { icon: 'bi-envelope', text: 'librarysystem670@gmail.com' },
    { icon: 'bi-telephone', text: '+91 6745628292' },
    { icon: 'bi-geo-alt', text: 'Hyderabad' },
  ];
}
