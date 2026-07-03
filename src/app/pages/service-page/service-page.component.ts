import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-service-page',
 imports: [CommonModule, RouterModule,HeaderComponent, FooterComponent],
  templateUrl: './service-page.component.html'
})
export class ServicePageComponent {

}


