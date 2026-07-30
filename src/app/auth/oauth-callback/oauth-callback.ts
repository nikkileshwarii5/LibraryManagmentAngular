import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-oauth-callback',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen">
      <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
      <p class="mt-4 text-gray-600">Completing Google Sign In...</p>
    </div>
  `
})
export class OauthCallback  implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const token = this.route.snapshot.queryParamMap.get('token');
    const email = this.route.snapshot.queryParamMap.get('email');
    const fullName = this.route.snapshot.queryParamMap.get('fullName');
    const role = this.route.snapshot.queryParamMap.get('role');

    if (token) {

      // ✅ store token
      localStorage.setItem('jwt', token);
      localStorage.setItem('token', token);

      // optional: store user
      console.log({ email, fullName, role });

      // redirect
    //   setTimeout(() => {
    //     if (role === 'ROLE_ADMIN' || role === 'ADMIN') {
    //       this.router.navigate(['/admin']);
    //     } else {
    //       this.router.navigate(['/']);
    //     }
    //   }, 1000);

    // } else {
    //   this.router.navigate(['/login']);
    // }


    setTimeout(() => {

  if (role === 'ROLE_ADMIN' || role === 'ADMIN') {

    this.router.navigate(['/admin/dashboard']);

  } else if (role === 'ROLE_USER' || role === 'USER') {

    this.router.navigate(['/user/dashboard']);

  } else {

    this.router.navigate(['/login']);

  }

}, 1000);
  }
  }
}
