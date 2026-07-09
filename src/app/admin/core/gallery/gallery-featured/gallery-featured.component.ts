import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare var $: any;
import 'select2';
import { ToastrService } from 'ngx-toastr';
import { GalleryFeaturedService } from './gallery-featured.service';
@Component({
  selector: 'app-gallery-featured',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery-featured.component.html'
})
export class GalleryFeaturedComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  searchTerm: string = '';
  galleryfeaturedList: any[] = []; 
  filteredGalleryFeaturedList: any[] = []; 

  constructor(
    public service: GalleryFeaturedService,
    private toastr: ToastrService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.fetchGalleryFeatured();
  }

  ngAfterViewInit(): void {
    const selectEl = $('#isActive');
  }

  // Fetch gallery featured List
  fetchGalleryFeatured() {
    this.isLoading = true;
    this.service.getGalleryFeatured().subscribe({
      next: (res: any) => {
        this.galleryfeaturedList = res.data;
        this.filteredGalleryFeaturedList = res.data;
        console.log(this.filteredGalleryFeaturedList, 'galleryfeaturedList');
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  filterCategories() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredGalleryFeaturedList = this.galleryfeaturedList;
    } else {
      const search = this.searchTerm.toLowerCase().trim();
      this.filteredGalleryFeaturedList = this.galleryfeaturedList.filter(item =>
        item.categoryName && item.categoryName.toLowerCase().includes(search)
      );
    }
  }

}