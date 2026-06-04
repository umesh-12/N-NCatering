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
      perPage: 5,
      gap: '20px',
      type: 'loop',
      pagination: false,
    }).mount();

    lightbox.option({
      resizeDuration: 200,
      wrapAround: true,
    });
  }
}
