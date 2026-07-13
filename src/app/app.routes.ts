import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LayoutComponent } from './admin/core/shared/components/layouts/layout/layout.component';
import { authGuard } from './admin/core/Auth/Authguard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      {
        path: 'admin-login',
        loadComponent: () =>
          import('./admin/core/Auth/login/adminlogin/adminlogin/adminlogin.component').then(
            (m) => m.AdminloginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./user-admin/core/auth/register/register.component').then(
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
        path: 'package',
        loadComponent: () =>
          import('./pages/package/package.component').then(
            (m) => m.PackageComponent,
          ),
      },

            {
        path: 'package-menu/:id',
        loadComponent: () =>
          import('./pages/package-menu/package-menu.component').then(
            (m) => m.PackageMenuComponent,
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
        path: 'service-single',
        loadComponent: () =>
          import('./pages/service-single/service-single.component').then(
            (m) => m.ServiceSingleComponent,
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact.component').then(
            (m) => m.ContactComponent,
          ),
      },

      // === ADMIN LAYOUT COMPONENTS ===
      {
        path: '',
        component: LayoutComponent,
        children: [
          {
            path: 'profile',
            loadComponent: () =>
              import('./admin/core/company-profile/company-profile.component').then(
                (m) => m.CompanyProfileComponent,
              ),
            canActivate: [authGuard],
          },
          {
            path: 'menu',
            loadChildren: () =>
              import('./admin/core/menu/menu.routes').then(
                (m) => m.menuRoutes
              ),
            canActivate: [authGuard],
          },
          {
            path: 'gallery',
            loadChildren: () =>
              import('./admin/core/gallery/gallery.routes').then(
                (m) => m.galleryRoutes
              ),
            canActivate: [authGuard],
          },
          // यहाँबाट gallery-single/:id हटाइएको छ ताकी यो बाहिर सहजै खुलोस्
        ],
      },

      { path: 'error', component: ErrorPageComponent }, 
      { path: '**', redirectTo: 'error' }, 
    ]
  },
];