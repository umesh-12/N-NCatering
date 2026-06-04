import { Component } from '@angular/core';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { AboutComponent } from '../../components/home/about/about.component';
import { ServicesComponent } from '../../components/home/services/services.component';
import { CallToActionComponent } from '../../components/home/call-to-action/call-to-action.component';
import { MenuCardComponent } from '../../components/home/menu-card/menu-card.component';
import { GalleryComponent } from '../../components/home/gallery/gallery.component';
import { TestimonialsComponent } from '../../components/home/testimonials/testimonials.component';
import { ReservationComponent } from '../../components/home/reservation/reservation.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    CallToActionComponent,
    MenuCardComponent,
    GalleryComponent,
    TestimonialsComponent,
    ReservationComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
