import { Login } from "./auth/login/login";
import { OauthCallback } from "./auth/oauth-callback/oauth-callback";
import { Register } from "./auth/register/register";
import { Addtestimonals } from "./landing/addtestimonals/addtestimonals";
import { Layout } from "./admin/layout/layout";
import { Home } from "./landing/home/home";
import { Dashboard } from "./admin/dashboard/dashboard";
import { Books } from "./admin/pages/books/books";
import { BookLoan } from "./admin/pages/book-loan/book-loan";
import { Fines } from "./admin/pages/fines/fines";
import { Reservations } from "./admin/pages/reservations/reservations";

import { Genres } from "./admin/pages/genres/genres";
import { Users } from "./admin/pages/users/users";
import { SubscriptionPlans } from "./admin/pages/subscription-plans/subscription-plans";
import { UserSubscriptions } from "./admin/pages/user-subscriptions/user-subscriptions";
import { Payments } from "./admin/pages/payments/payments";
import { UserLayoutComponent } from "./user/userlayout/userlayout/user-layout.component";
import { DashboardComponent } from "./user/userdashboard/dashboard/dashboard.component";
import { BooksPage } from "./user/UserComponents/books-page/books-page";
import { BookDetails } from "./user/UserComponents/book-details/book-details/book-details";
import { Myloans } from "./user/UserLoans/myloans/myloans";
import { ReservationsPage } from "./user/reservations/reservations-page/reservations-page";
import { MyFines } from "./user/fines/my-fines/my-fines";
import { SubscriptionsPage } from "./user/subscriptions/subscriptions-page/subscriptions-page";
import { PaymentSuccess } from "./user/pages/payment-success/payment-success";
import { Component } from "@angular/core";
import { WishlistPage } from "./user/UserComponents/wishlist-page/wishlist-page";
import { ProfileComponent } from "./user/UserComponents/profile-component/profile-component";

import { SettingsComponent } from "./user/UserComponents/settings-component/settings-component";
import { NotificationPage } from "./user/Notifications/notification-page/notification-page";
import { ForgotPassword } from "./auth/forgot-password/forgot-password";
import { ResetPassword } from "./auth/reset-password/reset-password";
import { AdminProfile } from "./admin/pages/admin-profile/admin-profile";
import { AdminSettingsComponent } from "./admin/pages/admin-settings-component/admin-settings-component";
import { AdminTestimonialsComponent } from "./admin/components/admin-testimonials-component/admin-testimonials-component";




export const routes = [

  {path:'',component:Home},
  {path: 'login', component: Login },
  {path: 'register', component: Register },
  {path: 'oauth2/callback', component: OauthCallback },
  // {path: 'add-testimonial', component: Addtestimonals },
  {path: 'forgot-password',component: ForgotPassword},

  {path: 'auth/reset-password',component: ResetPassword},
  // {path: 'dashboard',component:Dashboard}
    {
    path: 'admin',
    component: Layout,   // ✅ wrapper (sidebar)
    children: [
      { path: 'dashboard', component: Dashboard},
      { path: 'books', component: Books },
      { path: 'book-loans', component: BookLoan },
      { path: 'fines', component: Fines },
      { path: 'reservations', component:Reservations },
      {path:  'genres',component:Genres},
      {path: 'users',component:Users},
      {path:'subscription-plans',component:SubscriptionPlans},
      {path:'user-subscriptions',component:UserSubscriptions},
      {path:'payments',component:Payments},
      {path: 'profile',component: AdminProfile},
      {path: 'settings',component: AdminSettingsComponent},
      {path:'testimonials',component:AdminTestimonialsComponent}
  


  
      // add more here
    ]
  },

    /*
    USER ROUTES
  */

  {
    path: 'user',
    component: UserLayoutComponent,

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full' as const
      },
      

      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
      path: 'books',
      component: BooksPage
    },

    {
      path: 'books/:id',
      component: BookDetails
    },

    {
      path: 'loans',
      component: Myloans
    },

    {
      path: 'reservations',
     component: ReservationsPage
    },

    {
      path:'fines',
      component: MyFines
    },

    {
      path:'subscriptions',
      component: SubscriptionsPage 
    },

    {
    path: 'payment-success/:id',
    component: PaymentSuccess
  },

  {
    path: 'wishlist',
    component : WishlistPage

  },

  {
    path: 'add-testimonial',
    component: Addtestimonals
},
  {
    path: 'profile',
    component : ProfileComponent
  },

  {
    path: 'settings',
    component : SettingsComponent

  },

    {
  path: 'notifications',
  component: NotificationPage
}
 

    ]

  },





];