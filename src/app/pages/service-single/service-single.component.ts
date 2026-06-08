

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-service-single',
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