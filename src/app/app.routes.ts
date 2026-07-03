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
        path: 'menu-single/:id',
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

      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact.component').then(
            (m) => m.ContactComponent,
          ),
      },

      {
        path: '',
        component: LayoutComponent,
        children: [

          {
            path: 'package-menu',
            loadComponent: () =>
              import('./admin/core/package-menu/package-menu.component').then(
                (m) => m.PackageMenuComponent,

              ),
            canActivate: [authGuard],
          },

          {
            path: 'menu-category',
            loadComponent: () =>
              import('./admin/core/menu-category/menu-category.component').then(
                (m) => m.MenuCategoryComponent,

              ),
            canActivate: [authGuard],
          },

          {
            path: 'menu-item',
            loadComponent: () =>
              import('./admin/core/menu-item/menu-item.component').then(
                (m) => m.MenuItemComponent,

              ),
            canActivate: [authGuard],
          },
          {
            path: 'package',
            loadComponent: () =>
              import('./admin/core/package/package.component').then(
                (m) => m.PackageComponent,

              ),
            canActivate: [authGuard],
          },
          {
            path: 'profile',
            loadComponent: () =>
              import('./admin/core/company-profile/company-profile.component').then(
                (m) => m.CompanyProfileComponent,

              ),
            canActivate: [authGuard],
          },
          {
            path: 'products',
            loadComponent: () =>
              import('./admin/core/products/products.component').then(
                (m) => m.ProductsComponent,

              ),
            canActivate: [authGuard],
          },
          {
            path: 'gallery-category',
            loadComponent: () =>
              import('./admin/core/gallery-category/gallery-category.component').then(
                (m) => m.GalleryCategoryComponent,

              ),
            canActivate: [authGuard],
          },
          {
            path: 'admin-orders',
            loadComponent: () =>
              import('./admin/core/orders/orders.component').then(
                (m) => m.OrdersComponent,

              ),
            canActivate: [authGuard],
          },
          {
            path: 'category',
            loadComponent: () =>
              import('./admin/core/category/category.component').then(
                (m) => m.CategoryComponent,

              ),
            canActivate: [authGuard],
          },
        ],
      },

      { path: 'error', component: ErrorPageComponent }, // Define error page route
      { path: '**', redirectTo: 'error' }, // Wildcard route for 404 pages
    ]
  },




];
