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

  // {
  //   path: 'blog-single/:id',
  //   loadComponent: () =>
  //     import('./pages/blog-single/blog-single.component').then(
  //       (m) => m.BlogSingleComponent
  //     ),
  // },

  {
    path: 'blog-single',
    loadComponent: () =>
      import('./pages/blog-single/blog-single.component').then(
        (m) => m.BlogSingleComponent,
      ),
  },

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
