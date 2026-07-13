


import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';;
import { ToastrService } from 'ngx-toastr';

import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PackageService } from './package.service';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';


@Component({
  selector: 'app-package',
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './package.component.html'
})
export class PackageComponent implements OnInit, AfterViewInit {
  public baseurl = environment.apiBaseUrl;
  isLoading: boolean = false;
  packageList: any[] = [];
  packageName:string ='Our Packages'

  constructor(
    public service: PackageService,
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
