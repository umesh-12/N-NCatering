import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from './package.service';
import { environment } from '../../../../environments/environment';
declare var $: any;
import 'select2';
@Component({
  selector: 'app-package',
  imports: [CommonModule, FormsModule],
  templateUrl: './package.component.html'
})
export class PackageComponent implements OnInit, AfterViewInit {

  isLoading: boolean = false;
  searchTerm: string = '';
  packageList: any[] = []; // ओरिजिनल डाटा राख्न
  filteredpackageList: any[] = []; // फिल्टर भएको डाटा टेबलमा देखाउन

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;


  // Track selected category ID for editing
  selectedCategoryId: number | null = null;

  public baseurl = environment.apiBaseUrl;

  constructor(
    public service: PackageService,
    private toastr: ToastrService,
    private el: ElementRef
  ) { }
  ngOnInit(): void {
    this.fetchpackageList()
  }


  ngAfterViewInit(): void {
    const selectEl = $('#isActive');

    // Select2 Initialize गर्ने
    selectEl.select2();

    // Select2 मा भ्यालु चेन्ज हुँदा Angular Model अपडेट गर्ने
    selectEl.on('change', (e: any) => {
      const val = $(e.target).val();

      if (val === 'true') this.service.packageModel.isActive = true;
      else if (val === 'false') this.service.packageModel.isActive = false;
      else this.service.packageModel.isActive = null as any;
    });
  }
  // Fetch Menu category List
  fetchpackageList() {
    this.isLoading = true;
    this.service.getPackageList().subscribe({
      next: (res: any) => {
        this.packageList = res.data;
        this.filteredpackageList = res.data; // सुरुमा दुवैमा एउटै डाटा राख्ने
        console.log(res.data, 'packageList');
        this.isLoading = false;
        // this.filterCategories(); // यदि पहिले नै सर्च बक्समा केही लेखिएको छ भने फिल्टर होस्
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  filterCategories() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      // यदि सर्च बक्स खाली छ भने सबै डाटा देखाउने
      this.filteredpackageList = this.packageList;
    }
    else {
      const search = this.searchTerm.toLowerCase().trim();

      // categoryName अथवा itemName दुवै मध्ये कुनै एउटामा पनि search term छ भने फिल्टर गर्ने
      this.filteredpackageList = this.packageList.filter(item => {
        const matchCategory = item.categoryName && item.categoryName.toLowerCase().includes(search);
        const matchItem = item.itemName && item.itemName.toLowerCase().includes(search);

        return matchCategory || matchItem; // दुई मध्ये एक सही भए पुग्छ
      });
    }
  }

  // File Selection & Preview
  onFileSelected(event: any): void {
    debugger;
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  savePackage() {
    const formData = new FormData();
    debugger
    // if (!this.validateProduct()) {
    //   return;
    // }

    // if (!this.selectedProductId && !this.selectedFile) {
    //   this.toastr.error('Product Image is required');
    //   return;
    // }




    // १. अपडेट मोड हो भने सानो अक्षरमा मात्र 'id' पठाउने
    // if (this.selectedProductId) {
    //   formData.append('id', String(this.selectedProductId));
    // }


    formData.append('packageId', String(this.service.packageModel.packageId));
    formData.append('packageName', this.service.packageModel.packageName);
    formData.append('description', this.service.packageModel.description.trim());
    formData.append('price', String(this.service.packageModel.price));

    // ३. बुलिएन भ्यालुहरू - केवल सानो अक्षरमा एउटा मात्र पठाउने ('true' वा 'false')
    // यसले गर्दा भ्यालु डबल (true,true) पनि हुँदैन र ब्याकइन्डले सजिलै बुझ्छ
    const isActiveValue = this.service.packageModel.isActive ? 'true' : 'false';

    formData.append('isActive', isActiveValue);

    if (this.selectedFile) {
      formData.append('imageUrl', this.selectedFile);
    }

    this.isLoading = true;


    if (this.service.packageModel.packageId === 0) {
      this.service.postPackage(formData).subscribe({
        next: () => {
          this.toastr.success('Product updated successfully');
          this.fetchpackageList();
          this.reset();
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
    else {
      this.service.postPackage(formData).subscribe({
        next: (res: any) => {
          this.toastr.success('Product added successfully');
          this.fetchpackageList();
          this.reset();
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }


  reset() {
    this.service.packageModel = {
      packageId: 0,
      packageName: '',
      description: '',
      price: 0,
      imageUrl: '',
      isActive: true
    };

    this.selectedCategoryId = null;
    this.selectedFile = null;
    this.imagePreview = null;
  }


}
