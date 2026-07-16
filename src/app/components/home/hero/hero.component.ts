import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import Splide from '@splidejs/splide';
import { environment } from '../../../../environments/environment';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, AfterViewInit {
  @ViewChild('splide') splideElement!: ElementRef;
  isLoading: boolean = false;

  featuredGalleryList: any[] = [];
  
  public baseurl = environment.apiBaseUrl;
  constructor(
    public service: HeroService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.fetchgalleryList();
  }

  // Fetch Gallery List
  fetchgalleryList() {
    this.isLoading = true;
    this.service.getFeaturedGalleryList().subscribe({
      next: (res: any) => {
        this.featuredGalleryList = res.data || res;
        console.log(this.featuredGalleryList, 'fff')
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
        perPage: 1,
        perMove: 1,
        autoplay: true,
        interval: 3500,
        pauseOnHover: false,
        arrows: true,
        pagination: true,
        gap: '0',
        breakpoints: {
          1200: { perPage: 1 },
          992: { perPage: 1 },
          768: { perPage: 1 },
          576: { perPage: 1 } // मोबाइलमा १ वटा फोटो
        }
      }).mount();
    }
  }
  ngAfterViewInit(): void {


    //   new Splide(this.splideElement.nativeElement, {
    //     type: 'loop',
    //     perPage: 1,
    //     perMove: 1,
    //     autoplay: true,
    //     interval: 3500,
    //     pauseOnHover: false,
    //     arrows: true,
    //     pagination: true,
    //     gap: '0',
    //     breakpoints: {
    //       992: {
    //         perPage: 2,
    //       },
    //       768: {
    //         perPage: 1,
    //       },
    //     },
    //   }).mount();


    // }
  }
}