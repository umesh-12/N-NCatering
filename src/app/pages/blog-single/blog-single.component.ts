import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-blog-single',
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './blog-single.component.html'
})
export class BlogSingleComponent {

}
