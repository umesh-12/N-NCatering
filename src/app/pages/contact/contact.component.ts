import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent {

}
