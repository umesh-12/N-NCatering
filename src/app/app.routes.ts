import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },

  {
    path: 'gallery',
    loadComponent: () =>
      import('./pages/gallery-page/gallery-page.component').then(
        (m) => m.GalleryPageComponent,
      ),
  },

  // {
  //   path: 'shop',
  //   loadChildren: () =>
  //     import('./pages/shop/shop.routes').then((m) => m.shopRoutes),
  // },

  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blogs/blogs.component').then((m) => m.BlogsComponent),
  },


  {
    path: 'blog-single',
    loadComponent: () =>
      import('./pages/blog-single/blog-single.component').then(
        (m) => m.BlogSingleComponent,
      ),
  },

  {
    path: 'services',
    loadComponent: () =>
      import('./pages/service-page/service-page.component').then(
        (m) => m.ServicePageComponent,
      ),
  },



  {
    path: 'menu',
    loadComponent: () =>
      import('./pages/menu-categories-page/menu-categories-page.component').then(
        (m) => m.MenuCategoriesPageComponent,
      ),
  },

  
  {
    path: 'reservation',
    loadComponent: () =>
      import('./pages/booking-form/booking-form.component').then(
        (m) => m.BookingFormComponent,
      ),
  },


  {
    path: 'menu-single',
    loadComponent: () =>
      import('./pages/menu-single-page/menu-single-page.component').then(
        (m) => m.MenuSinglePageComponent,
      ),
  },


  {
    path: 'service-single',
    loadComponent: () =>
      import('./pages/service-single/service-single.component').then(
        (m) => m.ServiceSingleComponent,
      ),
  },





  // {
  //   path: 'blog-single/:id',
  //   loadComponent: () =>
  //     import('./pages/blog-single/blog-single.component').then(
  //       (m) => m.BlogSingleComponent
  //     ),
  // },


  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent,
      ),
  },

  { path: 'error', component: ErrorPageComponent }, // Define error page route
  { path: '**', redirectTo: 'error' }, // Wildcard route for 404 pages
];
