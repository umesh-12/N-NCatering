import { Routes } from '@angular/router';
import { authGuard } from '../Auth/Authguard/auth.guard';


export const menuRoutes: Routes = [
    {
        path: 'menu-item',
        loadComponent: () =>
            import('./menu-item/menu-item.component').then(
                (m) => m.MenuItemComponent,

            ),
    },
    {
        path: 'package',
        loadComponent: () =>
            import('./package/package.component').then(
                (m) => m.PackageComponent,

            ),
        canActivate: [authGuard],
    },
    {   
        path: 'package-menu',
        loadComponent: () =>
            import('./package-menu/package-menu.component').then(
                (m) => m.PackageMenuComponent,

            ),
    },
    {
        path: 'menu-category',
        loadComponent: () =>
            import('./menu-category/menu-category.component').then(
                (m) => m.MenuCategoryComponent,

            ),
    },

];
