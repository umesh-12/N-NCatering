import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare var $: any;
import 'select2';
import { MenuCategoryService } from './menu-category.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-menu-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-category.component.html'
})
export class MenuCategoryComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  searchTerm: string = '';
  menucategoryList: any[] = []; // ओरिजिनल डाटा राख्न
  filteredMenuCategoryList: any[] = []; // फिल्टर भएको डाटा टेबलमा देखाउन
  // Track selected category ID for editing
  selectedCategoryId: number | null = null;

  constructor(
    public service: MenuCategoryService,
    private toastr: ToastrService,
    private el: ElementRef
  ) { }
  ngOnInit(): void {
    this.fetchMenucategoryList()
  }

  ngAfterViewInit(): void {

  }

  // Fetch Menu category List
  fetchMenucategoryList() {
    this.isLoading = true;
    this.service.getMenuCategory().subscribe({
      next: (res: any) => {
        this.menucategoryList = res.data;
        this.filteredMenuCategoryList = res.data; // सुरुमा दुवैमा एउटै डाटा राख्ने
        console.log(res, 'menucategoryList');
        this.isLoading = false;
        this.filterCategories(); // यदि पहिले नै सर्च बक्समा केही लेखिएको छ भने फिल्टर होस्
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // ३. यो नयाँ सर्च फङ्सन थप्नुहोस्:
  filterCategories() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      // यदि सर्च बक्स खाली छ भने सबै डाटा देखाउने
      this.filteredMenuCategoryList = this.menucategoryList;
    } else {
      // टाइप गरेको अक्षरलाई सानो (lowercase) बनाएर Category Name सँग म्याच गराउने
      const search = this.searchTerm.toLowerCase().trim();
      this.filteredMenuCategoryList = this.menucategoryList.filter(item =>
        item.categoryName && item.categoryName.toLowerCase().includes(search)
      );
    }
  }


  getMenuCategoryId(ID: number) {
    this.isLoading = true;
    this.selectedCategoryId = ID;

    this.service.getCategoryById(ID).subscribe({
      next: (res: any) => {
        this.service.menuCategoryModel = {
          categoryId: res.data.categoryId ?? 0,
          categoryName: res.data.categoryName ?? '',
          displayOrder: res.data.displayOrder ?? 0,
          test: res.data.test ?? ''
        };

        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }


  // 1. Separate Validation Function
  validateForm(): boolean {
    const model = this.service.menuCategoryModel;

    // १. Category Name खाली छ कि छैन चेक गर्ने
    if (!model.categoryName || model.categoryName.trim() === '') {
      this.toastr.error('Category Name is required.');
      return false;
    }

    if (!model.displayOrder || model.displayOrder == 0) {
      this.toastr.error('Please select a valid Menu Category.');
      return false;
    }

    return true;
  }


  saveMenuCategory() {
    if (!this.validateForm()) return;

    this.isLoading = true;
    const model = this.service.menuCategoryModel;

    const payload = {
      categoryId: model.categoryId,
      categoryName: model.categoryName,
      displayOrder: model.displayOrder
    };


    if (model.categoryId === 0) {
      this.service.postMenuCategory(payload).subscribe({
        next: () => this.handleSuccess('Menu Category added successfully'),
        error: (err) => this.handleError(err)
      });
    } else {
      this.service.postMenuCategory(payload).subscribe({
        next: () => this.handleSuccess('Menu Category updated successfully'),
        error: (err) => this.handleError(err)
      });
    }
  }

  private handleSuccess(message: string) {
    this.toastr.success(message);
    this.fetchMenucategoryList();
    this.reset();
    this.isLoading = false;
  }


  private handleError(err: any) {
    console.error(err);
    this.isLoading = false;
  }


  // deleteCategory
  deleteMenuCategory(ID: number) {
    if (!confirm('Are you sure you want to delete this Category ?')) return;

    this.isLoading = true;
    this.service.deleteMenuCategory(ID).subscribe({
      next: (res: any) => {
        this.toastr.success('Item removed from Category');
        this.fetchMenucategoryList();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }


// reset category
  reset() {
    this.service.menuCategoryModel = {
      categoryId: 0,
      categoryName: '',
      displayOrder: 0,
      test: ''
    };

  }
}
