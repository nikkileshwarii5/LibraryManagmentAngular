import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestimonialService } from '../../services/TestimonialService';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatIconModule,CommonModule,FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isMenuOpen = false;
  activeSection = 'home';

  constructor(private router: Router ) {}



  navLinks = [
    { name: 'Home', section: 'home' },
    // { name: 'Browse Books', path: '/books' },
    { name: 'About', section: 'about' },
    { name: 'Contact', section: 'contact' },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

//   scrollToSection(sectionId: string) {
//   this.closeMenu();

//    this.activeSection = sectionId;

//   if (this.router.url !== '/') {
//     this.router.navigate(['/']).then(() => {
//       setTimeout(() => {
//         document.getElementById(sectionId)?.scrollIntoView({
//           behavior: 'smooth'
//         });
//       }, 100);
//     });
//   } else {
//     document.getElementById(sectionId)?.scrollIntoView({
//       behavior: 'smooth'
//     });
//   }
// }

scrollToSection(sectionId: string) {

  this.activeSection = sectionId;

  this.closeMenu();

  if (this.router.url !== '/') {

    this.router.navigate(['/']).then(() => {

      setTimeout(() => {

        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

      }, 100);

    });

  } else {

    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  }
}
}
