import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-products-tab',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './products-tab.component.html'
})
export class ProductsTabComponent {

}
