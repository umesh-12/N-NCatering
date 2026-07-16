import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';;
import { ToastrService } from 'ngx-toastr';
import { MenuCardService } from './menu-card.service';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-menu-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-card.component.html'
})
export class MenuCardComponent implements OnInit, AfterViewInit {
  public baseurl = environment.apiBaseUrl;
  isLoading: boolean = false;
  packageList: any[] = [];

  constructor(
    public service: MenuCardService,
    private toastr: ToastrService,
    private el: ElementRef
  ) { }
  ngOnInit(): void {
    this.fetchpackageList()
  }


  ngAfterViewInit(): void {

  }
  // Fetch Package  List
  fetchpackageList() {
    this.isLoading = true;
    this.service.getPackageList().subscribe({
      next: (res: any) => {
        this.packageList = res.data;
        console.log(res, 'packageList')

        this.packageList = this.packageList.filter(item => item.isActive == true)


        console.log(res.data, 'packageList');
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
