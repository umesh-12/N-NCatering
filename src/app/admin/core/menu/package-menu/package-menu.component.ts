import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare var $: any;
import 'select2';
import { ToastrService } from 'ngx-toastr';
import { PackageMenuService } from './package-menu.service';

@Component({
  selector: 'app-package-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './package-menu.component.html'
})

export class PackageMenuComponent implements OnInit, AfterViewInit {
  showPopup: boolean = false;
  isLoading: boolean = false;
  searchTerm: string = '';

  menuCategory: any[] = [];
  menuItem: any[] = [];

  packageMenuList: any[] = [];
  packageMenuItemList: any[] = [];

  filteredPackageMenuList: any[] = [];
  selectedPackageMenuId: number | null = null;

  constructor(
    public service: PackageMenuService,
    private toastr: ToastrService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.fetchMenuCategory();
    this.dropDownCategoryHandle();
    this.dropDownPackageHandle();
    this.dropDownExtraHandle();
    this.fetchPackageMenu();
  }

  ngAfterViewInit(): void { }

  // १. पपअप खोल्ने र डाटा सिंक गर्ने लजिक
  openPopup(id: number) {

    this.showPopup = true;
    // मोडलमा क्लिक गरिएको रो (Row) को ID सेट गर्ने
    this.service.packageMenuItemModel.packageMenuId = id;
    this.service.packageMenuItemModel.menuItemId = 0; // पुराना छानिएका आइटम रिसेट

    // Select2 ड्रपडाउन इनिसियलाइज र भ्यालु सिंक
    setTimeout(() => {
      $('#packageMenuId').select2().val(id).trigger('change');
      $('#menuItemId').select2().val('').trigger('change');
    }, 100);

    // Select2 मा आइटम चेन्ज हुँदा मोडल अपडेट गर्ने ह्यान्डलर
    setTimeout(() => {
      $('#menuItemId').on('change', (e: any) => {
        this.service.packageMenuItemModel.menuItemId = Number($(e.target).val());
      });
    }, 150);

    // आवश्यक डाटाहरू एपीआईबाट तान्ने
    this.fetchMenuItemList();
    this.fetchPackageMenuItemList(id);

  }


  closePopup() {
    this.showPopup = false;
  }


  validateForm(): boolean {
    const model = this.service.packageMenuModel;
    if (!model.categoryId || model.categoryId === 0) {
      this.toastr.warning('Please select a Menu Category');
      return false;
    }
    if (!model.packageId || model.packageId === 0) {
      this.toastr.warning('Please select a Package Name');
      return false;
    }
    if (model.isExtra === null || model.isExtra === undefined || (model.isExtra as any) === '') {
      this.toastr.warning('Please select whether it is Extra or not');
      return false;
    }
    if (model.chooseCount === undefined || model.chooseCount === null || model.chooseCount < 0) {
      this.toastr.warning('Please enter a valid count');
      return false;
    }
    return true;
  }


  dropDownPackageHandle() {
    const selectEl = $('#packageId');
    setTimeout(() => { selectEl.select2(); }, 10);
    selectEl.on('change', (e: any) => {
      const val = $(e.target).val();
      this.service.packageMenuModel.packageId = val ? Number(val) : 0;
    });
  }


  dropDownCategoryHandle() {
    const selectEl = $('#categoryId');
    setTimeout(() => { selectEl.select2(); }, 10);
    selectEl.on('change', (e: any) => {
      const val = $(e.target).val();
      this.service.packageMenuModel.categoryId = val ? Number(val) : 0;
    });
  }


  dropDownExtraHandle() {
    const selectEl = $('#isExtra');
    setTimeout(() => { selectEl.select2(); }, 10);
    selectEl.on('change', (e: any) => {
      const val = $(e.target).val();
      if (val === 'true') this.service.packageMenuModel.isExtra = true;
      else if (val === 'false') this.service.packageMenuModel.isExtra = false;
      else this.service.packageMenuModel.isExtra = null as any;
    });
  }


  fetchMenuCategory() {
    this.isLoading = true;
    this.service.getmenuCategory().subscribe({
      next: (res: any) => {
        this.menuCategory = res.data;
        this.isLoading = false;
        this.filterCategories();
      },
      error: (err: any) => { this.isLoading = false; }
    });
  }


  fetchPackageMenu() {
    this.isLoading = true;
    this.service.getPackageMenuList().subscribe({
      next: (res: any) => {
        this.packageMenuList = res;
        console.log(res, 'fetch')
        this.filteredPackageMenuList = res;
        this.isLoading = false;
        this.filterCategories();
      },
      error: (err: any) => { this.isLoading = false; }
    });
  }


  filterCategories() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredPackageMenuList = this.packageMenuList;
    } else {
      const search = this.searchTerm.toLowerCase().trim();
      this.filteredPackageMenuList = this.packageMenuList.filter(item => {
        const matchCategory = item.categoryName && item.categoryName.toLowerCase().includes(search);
        const matchpackageName = item.packageName && item.packageName.toLowerCase().includes(search);
        return matchCategory || matchpackageName;
      });
    }
  }


  savePackageMenu() {
    if (!this.validateForm()) return;
    this.isLoading = true;
    const model = this.service.packageMenuModel;
    const payload = {
      packageMenuId: model.packageMenuId,
      packageId: model.packageId,
      categoryId: model.categoryId,
      chooseCount: model.chooseCount,
      isExtra: model.isExtra
    };
    this.service.postPackageMenu(payload).subscribe({
      next: (res: any) => {
        const msg = model.packageMenuId === 0 ? 'Package Menu added successfully' : 'Package Menu updated successfully';
        this.handleSuccess(msg);
      },
      error: (err: any) => this.handleError(err)
    });
  }


  private handleSuccess(message: string) {
    this.toastr.success(message);
    this.fetchPackageMenu();
    this.isLoading = false;
  }


  private handleError(err: any) {
    console.error(err);
    this.isLoading = false;
  }


  getPackageMenuId(ID: number) {
    this.isLoading = true;
    this.selectedPackageMenuId = ID;
    this.service.getPackageMenuById(ID).subscribe({
      next: (res: any) => {
        this.service.packageMenuModel = {
          packageMenuId: res.packageMenuId ?? 0,
          packageId: res.packageId,
          categoryId: res.categoryId,
          chooseCount: res.chooseCount,
          isExtra: res.isExtra,
        };
        setTimeout(() => { $('#categoryId').val(Number(this.service.packageMenuModel.categoryId)).trigger('change'); });
        setTimeout(() => { $('#packageId').val(Number(this.service.packageMenuModel.packageId)).trigger('change'); });
        setTimeout(() => { $('#isExtra').val(String(this.service.packageMenuModel.isExtra)).trigger('change'); });
        this.isLoading = false;
      },
      error: (err: any) => { this.isLoading = false; }
    });
  }


  deletePackageMenu(ID: number) {
    if (!confirm('Are you sure you want to delete this Item?')) return;
    this.isLoading = true;
    this.service.deletePackageMenuById(ID).subscribe({
      next: (res: any) => {
        this.toastr.success('Item removed successfully');
        this.fetchPackageMenu();
        if (this.selectedPackageMenuId === ID) this.reset();
      },
      error: (err: any) => { this.isLoading = false; }
    });
  }


  reset() {
    this.service.packageMenuModel = {
      packageMenuId: 0,
      packageId: 0,
      categoryId: 0,
      chooseCount: 0,
      isExtra: this.service.packageMenuModel.isExtra,
    };
    this.selectedPackageMenuId = null;
    $('#categoryId').val(' ').trigger('change');
    $('#packageId').val(' ').trigger('change');
    $('#isExtra').val(' ').trigger('change'); ``
  }


  fetchPackageMenuItemList(ID: number) {
    this.isLoading = true;
    this.service.getPackageMenuItemList(ID).subscribe({
      next: (res: any) => {
        this.packageMenuItemList = res;
        console.log(res, 'packageMenuItemList')
        this.isLoading = false;
      },
      error: (err: any) => { this.isLoading = false; }
    });
  }


  fetchMenuItemList() {
    this.isLoading = true;
    this.service.getMenuItemList().subscribe({
      next: (res: any) => {
        this.menuItem = res;
        this.isLoading = false;
      },
      error: (err: any) => { this.isLoading = false; }
    });
  }

  ItemValidate(): boolean {
    const model = this.service.packageMenuItemModel;
    const menuItemId = Number(model.menuItemId);

    // 1. Dropdown Blank Option check
    if (!menuItemId || menuItemId === 0) {
      this.toastr.error('Please select a Menu Item', 'Validation Error');
      return false;
    }

    // 2. Exact Duplicate Check logic array check parsing
    // packageMenuItemList bhitra select bhako item pachi loop data filtering array mapping trigger
    const isDuplicate = this.packageMenuItemList.some(item => item.menuItemId === menuItemId);

    if (isDuplicate) {
      this.toastr.error('This Package Menu Item already exists in this category!', 'Duplicate Entry');
      return false;
    }

    return true;
  }


  // २. पपअप भित्रको सेभ (Create/Save)
  PostPackageMenuItem() {

    if (!this.ItemValidate()) {
      return;
    }

    const model = this.service.packageMenuItemModel;
    const packageMenuId = model.packageMenuId;
    const menuItemId = model.menuItemId;

    this.isLoading = true;
    this.service.postPackageMenuItem(packageMenuId, menuItemId).subscribe({
      next: (res: any) => {
        this.handleSuccessful('Package Menu Item added successfully');
        // मुख्य चेन्ज: थपिएपछि लिस्ट तुरुन्तै रिफ्रेस गर्न फङ्सन कल गरियो
        this.fetchPackageMenuItemList(packageMenuId);
        // सेभ भएपछि ड्रपडाउन खाली गर्ने
        $('#menuItemId').val('').trigger('change');
      },
      error: (err: any) => { this.handleErrorApi(err); }
    });
  }


  private handleSuccessful(message: string) {
    this.toastr.success(message);
    this.isLoading = false;
  }


  private handleErrorApi(err: any) {
    this.isLoading = false;
    this.toastr.error('Something went wrong', 'Error');
  }


  // ३. पपअप भित्रको डिलिट (Delete) लजिक सुधारिएको
  deletePackageMenuItem(item: any) {
    if (!confirm('Are you sure you want to delete this Item?')) return;
    const packageMenuId = item.packageMenuId;
    const menuItemId = item.menuItemId;
    this.isLoading = true;
    this.service.deletePackageMenuItem(packageMenuId, menuItemId).subscribe({
      next: (res: any) => {
        this.toastr.success('Item removed successfully');
        // मुख्य चेन्ज: डिलिट भएपछि पपअप भित्रको टेबल तुरुन्तै रिफ्रेस गर्न यो फङ्सन कल गरियो
        this.fetchPackageMenuItemList(packageMenuId);
      },
      error: (err: any) => { this.isLoading = false; }
    });
  }
}