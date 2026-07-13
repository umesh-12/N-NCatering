import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PackageService } from './package.service';
declare var $: any;
import 'select2';
import { environment } from '../../../../../environments/environment';

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
    if (!this.searchTerm?.trim()) {
      this.filteredpackageList = this.packageList;
      return;
    }
    const search = this.searchTerm.toLowerCase().trim();
    this.filteredpackageList = this.packageList.filter(item =>
      item.packageName?.toLowerCase().includes(search) || item.description?.toLowerCase().includes(search)
    );
  }

  // File Selection & Preview
  onFileSelected(event: any): void {
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


  validateForm(): boolean {
    const model = this.service.packageModel;


    if (!model.packageName || model.packageName.trim() === '') {
      this.toastr.error('Package Name is required.');
      return false;
    }


    if (!model.price || model.price == 0) {
      this.toastr.error('Price is required.');
      return false;
    }

    // ३. डुप्लिकेट नाम चेक गर्ने लजिक
    const isDuplicate = this.packageList.some(item => {
      const sameName = item.packageName?.toLowerCase().trim() === model.packageName?.toLowerCase().trim();

      if (model.packageId === 0) {
        // नयाँ थप्दा: नाम म्याच भयो भने डुप्लिकेट
        return sameName;
      } else {
        // इडिट गर्दा: आफ्नै ID बाहेक अरुसँग नाम मिल्यो भने मात्र डुप्लिकेट
        return sameName && item.packageId !== model.packageId;
      }
    });

    if (isDuplicate) {
      this.toastr.error('This Package Name already exists!', 'Duplicate Entry');
      return false;
    }

    return true;
  }

  savePackage() {
    // यहाँ भ्यालिडेशन फङ्सन कल गरिएको छ
    if (!this.validateForm()) {
      return;
    }

    const formData = new FormData();

    // if (!this.validateProduct()) {
    //   return;
    // }

    // १. अपडेट मोड हो भने सानो अक्षरमा मात्र 'id' पठाउने
    // if (this.selectedProductId) {
    //   formData.append('id', String(this.selectedProductId));
    // }

    debugger;
    formData.append('packageId', String(this.service.packageModel.packageId));
    formData.append('packageName', this.service.packageModel.packageName);
    formData.append('description', this.service.packageModel.description.trim());
    formData.append('price', String(this.service.packageModel.price));

    const isActiveValue = this.service.packageModel.isActive ? 'true' : 'false';

    formData.append('isActive', isActiveValue);
    
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }
    // else if (this.service.packageModel.imageUrl) {
    //   formData.append('Image', this.service.packageModel.imageUrl);
    // }

    else if (this.service.packageModel.packageId > 0) {
      // २. यदि नयाँ फाइल छैन र यो UPDATE मोड हो भने, पुरानो इमेजको पाथ 'ImageUrl' मा पठाइदिने
      formData.append('Image', this.service.packageModel.imageUrl);
    } 

    this.isLoading = true;

    if (this.service.packageModel.packageId === 0) {
      this.service.postPackage(formData).subscribe({
        next: () => {
          this.toastr.success('Package added successfully');
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
          this.toastr.success('Package updated successfully');
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

  // ==========================================
  // ३. Edit मोडमा फारम भर्ने फङ्सन
  // ==========================================
  getPackageId(ID: number) {
    this.isLoading = true;

    this.service.getPackageById(ID).subscribe({
      next: (res: any) => {
        this.service.packageModel = {
          packageId: res.data.packageId ?? 0,
          packageName: res.data.packageName ?? '',
          description: res.data.description ?? '',
          price: res.data.price ?? 0,
          imageUrl: res.data.imageUrl ?? '',
          isActive: res.data.isActive ?? true
        };

        this.imagePreview = res.data.imageUrl ? this.baseurl + res.data.imageUrl : null;
        this.selectedFile = null;

        setTimeout(() => {
          const Id = res.data.isActive;
          $('#isActive').val(String(Id)).trigger('change');
        }, 0);

        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // Delete product
  deletePackage(ID: number) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.isLoading = true;
    this.service.deletePackageById(ID).subscribe({
      next: (res: any) => {
        this.toastr.success('Item removed from Product');
        this.fetchpackageList();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // Reset Form
  reset() {
    this.service.packageModel = {
      packageId: 0,
      packageName: '',
      description: '',
      price: 0,
      imageUrl: '',
      isActive: $('#isActive').val('').trigger('change')
    };

    this.selectedFile = null;
    this.imagePreview = null;
  }
}