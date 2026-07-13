import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // *ngFor र *ngIf का लागि आवश्यक
import Splide from '@splidejs/splide';
import { GalleryService } from './gallery.service';
import { environment } from '../../../../environments/environment';

declare var $: any;
declare var lightbox: any;

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  galleryList: any[] = [];
  public baseurl = environment.apiBaseUrl;

  @ViewChild('gallery') splideElement!: ElementRef;

  constructor(
    public service: GalleryService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.fetchgalleryList();
  }

  ngAfterViewInit() {
    // लाइटबक्सलाई पहिले नै रेडी बनाइदिने
    
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true,
    });
  }

  // Fetch Gallery List
  fetchgalleryList() {
    this.isLoading = true;
    this.service.getGalleryList().subscribe({
      next: (res: any) => {
        this.galleryList = res.data || res;
        this.isLoading = false;

        // डेटा आइसकेपछि HTML मा elements हरू रेन्डर हुन १ मिलिसेकेन्ड कुरेर मात्र Splide चलाउने
        setTimeout(() => {
          this.initSplide();
        }, 10);
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // Splide Slider सुरु गर्ने फङ्सन
  initSplide() {
    if (this.splideElement && this.splideElement.nativeElement) {
      new Splide(this.splideElement.nativeElement, {
        type: 'loop',
        gap: '20px',
        pagination: false,
        perPage: 5, // ठूलो स्क्रिनमा ५ वटा फोटो
        breakpoints: {
          1200: { perPage: 4 },
          992: { perPage: 3 },
          768: { perPage: 2 },
          576: { perPage: 1 } // मोबाइलमा १ वटा फोटो
        }
      }).mount();
    }
  }
}