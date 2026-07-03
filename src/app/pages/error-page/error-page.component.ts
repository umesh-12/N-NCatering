import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-error-page',
    imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent {

}
