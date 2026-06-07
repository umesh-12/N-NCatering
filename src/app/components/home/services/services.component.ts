import { AfterViewInit, Component } from '@angular/core';
import AOS from 'aos';
@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.component.html'
})
export class ServicesComponent  implements AfterViewInit {
  ngAfterViewInit(): void {
    AOS.init({
      duration: 1000,
      once: true,   // animation runs only once
      offset: 0,
      easing: 'ease-in'
    });
  }
}
