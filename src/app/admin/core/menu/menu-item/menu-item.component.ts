import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare var $: any;
import 'select2';

import { ToastrService } from 'ngx-toastr';
import { MenuItemService } from './menu-item.service';

@Component({
  selector: 'app-menu-item',
  standalone: true, // standalone true राखिएको छ
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  searchTerm: string = '';

  menuCategory: any[] = [];
  menuItemList: any[] = []; // ओरिजिनल डाटा राख्न
  filteredMenuItemList: any[] = []; // फिल्टर भएको डाटा टेबलमा देखाउन
  
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

  dropDownCategoryHandle() {
    const selectEl = $('#categoryId');
    setTimeout(() => { selectEl.select2(); }, 10);
    selectEl.on('change', (e: any) => {
      const val = $(e.target).val();
      if (val) {
        this.service.menuItemModel.categoryId = Number(val);
      } else {
        this.service.menuItemModel.categoryId = 0;
      }
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
          categoryId: res.categoryId ?? this.service.menuItemModel.categoryId,
          itemName: res.itemName ?? '',
        };

        setTimeout(() => {
          $('#categoryId').val(Number(this.service.menuItemModel.categoryId)).trigger('change');
        });
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // १. फारम भ्यालिडेसन (यहाँ डुप्लिकेट रोक्ने मुख्य लजिक थपिएको छ)
  validateForm(): boolean {
    const model = this.service.menuItemModel;

    if (!model.itemName || model.itemName.trim() === '') {
      this.toastr.error('Item Name is required.');
      return false;
    }

    if (!model.categoryId || model.categoryId == 0) {
      this.toastr.error('Please select a valid Menu Category.');
      return false;
    }

    // डुप्लिकेट डाटा चेक गर्ने लजिक:
    // यदि नयाँ एड गर्दैछ भने (menuItemId === 0) वा इडिट गर्दैछ भने (आफ्नो बाहेक अरुसँग म्याच गर्ने)
    const isDuplicate = this.menuItemList.some(item => {
      const sameName = item.itemName.toLowerCase().trim() === model.itemName.toLowerCase().trim();
      const sameCategory = Number(item.categoryId) === Number(model.categoryId);
      
      if (model.menuItemId === 0) {
        // नयाँ थप्दा: नाम र क्याटगोरी दुवै मिलेमा डुप्लिकेट मानिनेछ
        return sameName && sameCategory;
      } else {
        // इडिट गर्दा: आफ्नै ID बाहेक अरु कुनै रोमा नाम र क्याटगोरी म्याच गरेमा मात्र डुप्लिकेट मानिनेछ
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
      categoryId: model.categoryId,
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
    $('#categoryId').val('').trigger('change');
  }
}