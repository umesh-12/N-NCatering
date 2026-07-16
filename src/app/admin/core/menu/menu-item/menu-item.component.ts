import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare var $: any;
import 'select2';
import { ToastrService } from 'ngx-toastr';
import { MenuItemService } from './menu-item.service';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-item.component.html'
})

export class MenuItemComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  searchTerm: string = '';
  menuCategory: any[] = [];
  menuItemList: any[] = []; // ओरिजिनल डाटा राख्न
  filteredMenuItemList: any[] = []; // फिल्टर भएको डाटा


  // ==========================================
  // PAGINATION VARIABLES
  // ==========================================
  currentPage: number = 1; // हालको पेज नम्बर
  pageSize: number = 8;   // एउटा पेजमा देखिने रो (Rows) को संख्या
  // Track selected category ID for editing
  selectedmenuItemId: number | null = null;


  constructor(
    public service: MenuItemService,
    private toastr: ToastrService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.fetchMenuItemList();
    this.dropDownCategoryHandle();
    this.fetchMenuCategory();
  }

  ngAfterViewInit(): void { }
  // ==========================================
  // PAGINATION METHODS (परिमार्जित पेजिनेसन मेथड्स)
  // ==========================================
  // १. हालको पेजका लागि सिमित आइटमहरू मात्र काट्ने (Slice गर्ने)

  get paginatedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredMenuItemList.slice(startIndex, startIndex + this.pageSize);
  }
  // २. जम्मा कति वटा पेजहरू बन्छन् भनेर निकाल्ने
  get totalPages(): number {
    return Math.ceil(this.filteredMenuItemList.length / this.pageSize);
  }
  // ३. एचटीएमएलमा देखाउनका लागि बढीमा ८ वटा पेज नम्बरहरूको मात्र एरे बनाउने (नयाँ लजिक)
  get pageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const maxButtons = 8; // एक पटकमा देखाउनुपर्ने बढीमा ८ वटा बटन
    let startPage: number;
    let endPage: number;

    if (total <= maxButtons) {
      // यदि जम्मा पेज संख्या नै ८ वा सोभन्दा कम छ भने सबै पेज देखाउने
      startPage = 1;
      endPage = total;
    } else {
      // यदि ८ भन्दा बढी पेजहरू छन् भने हालको पेजलाई बिच (Center) मा पार्ने लजिक:
      const half = Math.floor(maxButtons / 2); // जस्तै: ४
      if (current <= half) {
        startPage = 1;
        endPage = maxButtons;
      } else if (current + (maxButtons - half - 1) >= total) {
        startPage = total - maxButtons + 1;
        endPage = total;
      } else {
        startPage = current - half;
        endPage = current + (maxButtons - half - 1);
      }
    }

    // प्राप्त स्टार्ट र एन्ड पेजको आधारमा एरे बनाउने
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // ४. पेज परिवर्तन गराउने फङ्सन
  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // ५. Math.min लाई HTML मा सिधै कल गर्न नमिल्ने भएकोले हेल्पर राखिएको
  mathMin(val1: number, val2: number): number {
    return Math.min(val1, val2);
  }

  // ==========================================
  // EXISTING METHODS (साविकका सबै फङ्सनहरू)
  // ==========================================
  dropDownCategoryHandle() {
    const selectEl = $('#categoryId');
    setTimeout(() => { selectEl.select2(); }, 10);
    // selectEl.on('change', (e: any) => {
    //   const val = $(e.target).val();
    //   if (val) {
    //     this.service.menuItemModel.categoryId = Number(val);
    //   } else {
    //     this.service.menuItemModel.categoryId = 0;
    //   }
    // });
  }

  fetchMenuCategory() {
    this.isLoading = true;
    this.service.getmenuCategory().subscribe({
      next: (res: any) => {
        this.menuCategory = res.data;
        this.isLoading = false;
        this.filterCategories();
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // Fetch Menu item List
  fetchMenuItemList() {
    this.isLoading = true;
    this.service.getMenuItemList().subscribe({
      next: (res: any) => {
        this.menuItemList = res;
        this.filteredMenuItemList = res;
        this.isLoading = false;
        this.filterCategories();
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  filterCategories() {
    // सर्च गर्दा जहिले पनि पहिलो पेज (Page 1) बाट देखाउनका लागि
    this.currentPage = 1;
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredMenuItemList = this.menuItemList;
    } else {
      const search = this.searchTerm.toLowerCase().trim();
      this.filteredMenuItemList = this.menuItemList.filter(item => {
        const matchCategory = item.categoryName && item.categoryName.toLowerCase().includes(search);
        const matchItem = item.itemName && item.itemName.toLowerCase().includes(search);
        return matchCategory || matchItem;
      });
    }
  }

  getMenuItemId(ID: number) {
    this.isLoading = true;
    this.selectedmenuItemId = ID;
    this.service.getMenuItemById(ID).subscribe({
      next: (res: any) => {
        this.service.menuItemModel = {
          menuItemId: res.menuItemId ?? 0,
          categoryId: res.categoryId,
          itemName: res.itemName ?? '',
        };
        setTimeout(() => {
          $('#categoryId').val(res.categoryId).trigger('change');
        });
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // १. फारम भ्यालिडेसन
  validateForm(): boolean {
    const model = this.service.menuItemModel;
    if (!model.itemName || model.itemName.trim() === '') {
      this.toastr.error('Item Name is required.');
      return false;
    }
    if (! $("#categoryId").val() ||  $("#categoryId").val() == 0) {
      this.toastr.error('Please select a valid Menu Category.');
      return false;
    }
    // डुप्लिकेट डाटा चेक गर्ने लजिक:
    const isDuplicate = this.menuItemList.some(item => {
      const sameName = item.itemName.toLowerCase().trim() === model.itemName.toLowerCase().trim();
      const sameCategory = Number(item.categoryId) === Number(model.categoryId);
      if (model.menuItemId === 0) {
        return sameName && sameCategory;
      } else {
        return sameName && sameCategory && item.menuItemId !== model.menuItemId;
      }
    });
    if (isDuplicate) {
      this.toastr.error('This Item Name already exists in the selected Category!', 'Duplicate Entry');
      return false;
    }
    return true;
  }


  saveMenuItem() {
    if (!this.validateForm()) return;
    this.isLoading = true;
    const model = this.service.menuItemModel;
    const payload = {
      menuItemId: model.menuItemId,
      categoryId: $("#categoryId").val() ? Number($("#categoryId").val()) : 0,
      itemName: model.itemName
    };
    if (model.menuItemId === 0) {
      // Add New Item
      this.service.postMenuItem(payload).subscribe({
        next: (res: any) => this.handleSuccess('Menu Item added successfully'),
        error: (err: any) => this.handleError(err)
      });
    } else {
      // Update Existing Item
      this.service.postMenuItem(payload).subscribe({
        next: (res: any) => this.handleSuccess('Menu Item updated successfully'),
        error: (err: any) => this.handleError(err)
      });
    }
  }

  private handleSuccess(message: string) {
    this.toastr.success(message);
    this.fetchMenuItemList();
    this.reset();
    this.isLoading = false;
  }

  private handleError(err: any) {
    console.error(err);
    this.isLoading = false;
  }

  // Delete menu item
  deleteMenuItem(ID: number) {
    if (!confirm('Are you sure you want to delete this Item?')) return;
    this.isLoading = true;
    this.service.deleteMenuItem(ID).subscribe({
      next: (res: any) => {
        this.toastr.success('Item removed successfully');
        this.fetchMenuItemList();
        // यदि डिलिट गरिएको आइटम अहिले फारममा इडिट मोडमा खुला थियो भने फारम रिसेट गर्ने
        if (this.selectedmenuItemId === ID) {
          this.reset();
        }
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }


  // Reset Form
  reset() {
    this.service.menuItemModel = {
      menuItemId: 0,
      categoryId: 0,
      itemName: '',
    };
    this.selectedmenuItemId = null;
    $('#categoryId').val(' ').trigger('change');
  }
}