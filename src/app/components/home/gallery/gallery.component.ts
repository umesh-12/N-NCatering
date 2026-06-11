import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import Splide from '@splidejs/splide';

declare var lightbox: any;

@Component({
  selector: 'app-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements AfterViewInit {
  @ViewChild('gallery') splideElement!: ElementRef;

ngAfterViewInit() {
  new Splide(this.splideElement.nativeElement, {
    type: 'loop',
    gap: '20px',
    pagination: false,

    perPage: 5, // default (large screens)

    breakpoints: {
      1200: {
        perPage: 4,
      },
      992: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
      576: {
        perPage: 1,
      },
    },
  }).mount();

  lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
  });
}
}
