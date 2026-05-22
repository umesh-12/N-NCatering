import { Component } from '@angular/core';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { BenefitsComponent } from '../../components/home/benefits/benefits.component';
import { CategoriesComponent } from '../../components/home/categories/categories.component';
import { ProductsTabComponent } from '../../components/home/products-tab/products-tab.component';
import { CallToActionComponent } from '../../components/home/call-to-action/call-to-action.component';
import { BlogsComponent } from '../../components/home/blogs/blogs.component';
import { TestimonialsComponent } from '../../components/home/testimonials/testimonials.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    BenefitsComponent,
    CategoriesComponent,
    ProductsTabComponent,
    CallToActionComponent,
    BlogsComponent,
    TestimonialsComponent,
    
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
