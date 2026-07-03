

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-service-single',
    imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './service-single.component.html',

})
export class ServiceSingleComponent {

  serviceId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.serviceId = params.get('id');
      window.scrollTo(0, 0); // optional safety scroll fix
    });
  }
}