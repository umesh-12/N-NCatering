import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-menu-detail',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './menu-detail.component.html'
})
export class MenuDetailComponent {

}
