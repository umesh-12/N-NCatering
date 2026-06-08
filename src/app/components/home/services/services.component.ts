import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import AOS from 'aos';
@Component({
  selector: 'app-services',
  imports: [CommonModule, RouterModule,],
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
