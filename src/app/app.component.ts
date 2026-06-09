import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {

  constructor(private router: Router) {}

  // Initialize AOS after initial DOM render
  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100
      });
    }, 200); // small delay ensures DOM is ready
  }

  // Refresh AOS after each route navigation (fixes blank page on reload)
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          AOS.refreshHard(); // important for lazy-loaded pages
        }, 100);
      }
    });
  }
}