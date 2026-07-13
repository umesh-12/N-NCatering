import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { GalleryPageService } from './gallery-page.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './gallery-page.component.html',
})
export class GalleryPageComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  gallerycategoryList: any[] = [];
  galleryList: any[] = [];
  selectedFilter: string = 'all';

  public baseurl = environment.apiBaseUrl;

  constructor(
    public service: GalleryPageService,
    private toastr: ToastrService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.fetchgalleryList();
    this.fetchGalleryCategories();
  }

  ngAfterViewInit(): void {
    // यहाँ आवश्यक्ता अनुसार Lightbox वा AOS इनिसियलाइज गर्न सक्नुहुन्छ
  }

  setFilter(filter: string) {
    this.selectedFilter = filter;
  }

  // ग्यालेरी लिस्टलाई क्याटेगोरी अनुसार फिल्टर गर्ने Getter फङ्सन
  get filteredItems() {
    if (this.selectedFilter === 'all') {
      return this.galleryList;
    }
    // API बाट आउने र सिलेक्ट भएको categoryName लाई सानो अक्षर (lowercase) बनाएर दाँज्ने
    return this.galleryList.filter(
      (item) => item.categoryName?.toLowerCase() === this.selectedFilter?.toLowerCase()
    );
  }

  // Fetch Gallery List
  fetchgalleryList() {
    this.isLoading = true;
    this.service.getGalleryList().subscribe({
      next: (res: any) => {
        // यदि एपीआई रेस्पोन्स सिधै एरे हो भने 'res' र यदि अब्जेक्ट हो भने 'res.data' लिने
        this.galleryList = res.data || res;
            console.log(res,'gallery')
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
        this.toastr.error('Can not get gallery item', 'Error');
      }
    });
  }

  // Fetch gallery category List
  fetchGalleryCategories() {
    this.isLoading = true;
    this.service.getGalleryCategories().subscribe({
      next: (res: any) => {
    
        this.gallerycategoryList = res.data || res;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
        this.toastr.error('Can not get gallery category', 'Error');
      }
    });
  }
}