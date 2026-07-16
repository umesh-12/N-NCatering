import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
declare var $: any;
import 'select2';
import { ToastrService } from 'ngx-toastr';
import { GalleryCategoryService } from './gallery-category.service';

@Component({
  selector: 'app-gallery-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery-category.component.html'
})


export class GalleryCategoryComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  searchTerm: string = '';
  gallerycategoryList: any[] = [];

  filteredGalleryCategoryList: any[] = [];

  constructor(
    public service: GalleryCategoryService,
    private toastr: ToastrService,
    private el: ElementRef
  ) { }


  ngOnInit(): void {
    this.fetchGalleryCategories();
  }


  ngAfterViewInit(): void {
    const selectEl = $('#isActive');
    // Select2 Initialize गर्ने
    setTimeout(() => {
      selectEl.select2();
    }, 50);

  }


  // Fetch gallery category List
  fetchGalleryCategories() {
    this.isLoading = true;
    this.service.getGalleryCategories().subscribe({
      next: (res: any) => {
        this.gallerycategoryList = res;
        this.filteredGalleryCategoryList = res; // सुरुमा दुवैमा एउटै डाटा राख्ने
        console.log(this.filteredGalleryCategoryList, 'gallerycategoryList');
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }


  filterCategories() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredGalleryCategoryList = this.gallerycategoryList;
    } else {
      const search = this.searchTerm.toLowerCase().trim();
      this.filteredGalleryCategoryList = this.gallerycategoryList.filter(item =>
        item.categoryName && item.categoryName.toLowerCase().includes(search)
      );
    }
  }


  // Fetch gallery category by ID for editing
  getGalleryCategoryId(ID: number) {
    this.isLoading = true;
    this.service.getGalleryCategoryById(ID).subscribe({
      next: (res: any) => {
        this.service.galleryCategoryModel = {
          galleryMasterId: res.galleryMasterId ?? 0,
          categoryName: res.categoryName ?? '',
          displayOrder: res.displayOrder ?? 0,
          isActive: res.isActive ?? true
        };
        // Select2 dropdown लाई नयाँ value सँग sync गर्ने
        setTimeout(() => {
          $('#isActive').val(String(this.service.galleryCategoryModel.isActive)).trigger('change');
        });


        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }


  // 1. Separate Validation Function with Duplicate Check
  validateForm(): boolean {
    const model = this.service.galleryCategoryModel;
    // १. Category Name खाली छ कि छैन चेक गर्ने
    if (!model.categoryName || model.categoryName.trim() === '') {
      this.toastr.error('Category Name is required.');
      return false;
    }
    if (!model.displayOrder || model.displayOrder == 0) {
      this.toastr.error('Please fill display order.');
      return false;
    }

    if (!$("#isActive").val() || $("#isActive").val() === 'null' || $("#isActive").val() === 'undefined') {
      this.toastr.error('Please select isActive Status.');
      return false;
    }

    const isDuplicate = this.gallerycategoryList.some(item => {
      const sameName = item.categoryName?.toLowerCase().trim() === model.categoryName?.toLowerCase().trim();
      if (model.galleryMasterId === 0) {
        return sameName;
      } else {
        return sameName && item.galleryMasterId !== model.galleryMasterId;
      }
    });
    if (isDuplicate) {
      this.toastr.error('This Category Name already exists!', 'Duplicate Entry');
      return false;
    }
    return true;
  }


  // 2. Save or Update Gallery Category
  saveGalleryCategory() {
    if (!this.validateForm()) return;
    this.isLoading = true;
    const model = this.service.galleryCategoryModel;
    const payload = {
      galleryMasterId: model.galleryMasterId,
      categoryName: model.categoryName,
      displayOrder: model.displayOrder,
      isActive: $("#isActive").val() === 'true' ? true : false
      ///Noted important---------------------
      // isActive: this.service.galleryCategoryModel.isActive
    };
    if (model.galleryMasterId === 0) {
      this.service.postGalleryCategory(payload).subscribe({
        next: () => this.handleSuccess('Gallery Category added successfully'),
        error: (err) => this.handleError(err)
      });
    } else {
      this.service.postGalleryCategory(payload).subscribe({
        next: () => this.handleSuccess('Gallery Category updated successfully'),
        error: (err) => this.handleError(err)
      });
    }
  }


  private handleSuccess(message: string) {
    this.toastr.success(message);
    this.fetchGalleryCategories();
    this.reset();
    this.isLoading = false;
  }
  private handleError(err: any) {
    console.error(err);
    this.reset();
    this.isLoading = false;
  }


  // deleteCategory
  deleteGalleryCategory(ID: number) {
    if (!confirm('Are you sure you want to delete this Category ?')) return;
    this.isLoading = true;
    this.service.deleteGalleryCategory(ID).subscribe({
      next: (res: any) => {
        this.toastr.success('Item removed from Category');
        this.fetchGalleryCategories();
        this.reset();
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
    this.service.galleryCategoryModel = {
      galleryMasterId: 0,
      categoryName: '',
      displayOrder: 0,
      isActive: this.service.galleryCategoryModel.isActive
    };
    // Reset गर्दा Select2 Dropdown लाई पनि UI मा "true" मा फिर्ता लैजाने
    setTimeout(() => {
      $('#isActive').val(' ').trigger('change');
    });
  }


}