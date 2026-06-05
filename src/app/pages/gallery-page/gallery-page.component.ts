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
      image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba',
    },
    {
      id: 2,
      category: 'corporate',
      title: 'Corporate Setup',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033',
    },
    {
      id: 3,
      category: 'birthday',
      title: 'Birthday Party',
      image: 'https://images.unsplash.com/photo-1521305916504-4a1121188589',
    },
    {
      id: 4,
      category: 'decoration',
      title: 'Stage Decoration',
      image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0',
    },
    {
      id: 5,
      category: 'wedding',
      title: 'Wedding Buffet',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3',
    },
    {
      id: 6,
      category: 'corporate',
      title: 'Corporate Meeting',
      image: 'https://images.unsplash.com/photo-1543353071-873f17a7a088',
    },
    {
      id: 7,
      category: 'decoration',
      title: 'Elegant Setup',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1',
    },
    {
      id: 8,
      category: 'birthday',
      title: 'Food Setup',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
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
