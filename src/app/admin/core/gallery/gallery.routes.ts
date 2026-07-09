import { Routes } from '@angular/router';


export const galleryRoutes: Routes = [
    {
        path: 'gallery-item',
        loadComponent: () =>
            import('./gallery/gallery.component').then(
                (m) => m.GalleryComponent,

            ),
    },

    {
        path: 'gallery-category',
        loadComponent: () =>
            import('./gallery-category/gallery-category.component').then(
                (m) => m.GalleryCategoryComponent,

            ),
    },

    {
        path: 'gallery-featured',
        loadComponent: () =>
            import('./gallery-featured/gallery-featured.component').then(
                (m) => m.GalleryFeaturedComponent,

            ),
    },
];
