import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, HeaderComponent,FooterComponent],
  templateUrl: './about.component.html'
})
export class AboutComponent {

}
