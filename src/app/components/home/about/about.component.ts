import { AfterViewInit, Component } from '@angular/core';
import AOS from 'aos';
@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html'
})
export class AboutComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    AOS.init({
      duration: 1000,
      once: true,   // animation runs only once
      offset: 0,
      easing: 'ease-in'
    });
  }
}