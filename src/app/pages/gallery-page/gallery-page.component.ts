import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery-page.component.html',
})
export class GalleryPageComponent {
  selectedFilter: string = 'all';

  galleryItems = [
    {
      id: 1,
      category: 'wedding',
      title: 'Wedding Event',
      image: '/assets/img/gallery/photo-1.jpeg',
    },
    {
      id: 2,
      category: 'corporate',
      title: 'Corporate Setup',
      image: '/assets/img/gallery/g-8.jpg',
    },
    {
      id: 3,
      category: 'birthday',
      title: 'Birthday Party',
      image: '/assets/img/gallery/g-1.jpg',
    },
    {
      id: 4,
      category: 'decoration',
      title: 'Stage Decoration',
      image: '/assets/img/gallery/g-2.jpg',
    },
    {
      id: 5,
      category: 'wedding',
      title: 'Wedding Buffet',
      image: '/assets/img/gallery/g-3.jpg',
    },
    {
      id: 6,
      category: 'corporate',
      title: 'Corporate Meeting',
      image: '/assets/img/gallery/g-4.jpg',
    },
    {
      id: 7,
      category: 'decoration',
      title: 'Elegant Setup',
      image: '/assets/img/gallery/g-5.jpg',
    },
    {
      id: 8,
      category: 'birthday',
      title: 'Food Setup',
      image: '/assets/img/gallery/g-6.jpg',
    },
  ];

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }

  get filteredItems() {
    if (this.selectedFilter === 'all') {
      return this.galleryItems;
    }
    return this.galleryItems.filter(
      (item) => item.category === this.selectedFilter,
    );
  }
}
