import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import Splide from '@splidejs/splide';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('splide') splideElement!: ElementRef;

  ngAfterViewInit(): void {
    new Splide(this.splideElement.nativeElement, {
      type: 'loop',
      perPage: 1,
      perMove: 1,
      autoplay: true,
      interval: 3000,
      pauseOnHover: false,
      arrows: true,
      pagination: true,
      gap: '0',
      breakpoints: {
        992: {
          perPage: 2,
        },
        768: {
          perPage: 1,
        },
      },
    }).mount();
  }
}
