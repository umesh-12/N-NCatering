import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GalleryService } from './gallery.service';
declare var $: any;
import 'select2';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  searchTerm: string = '';
  galleryCategory: any[] = [];
  galleryList: any[] = [];
  filteredgalleryList: any[] = [];

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  public baseurl = environment.apiBaseUrl;

  constructor(
    public service: GalleryService,
    private toastr: ToastrService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.fetchgalleryList();
  }

  ngAfterViewInit(): void {
    this.selectedIsActive();
    this.selectedIsFeatured();
    this.selectedGalleryMasterId(); // 
    this.fetchGalleryCategory();
  }

  selectedGalleryMasterId() {
    const selectEl = $('#GalleryMasterId');
    setTimeout(() => {
      selectEl.select2();
    }, 10);

    selectEl.on('change', (e: any) => {
      const val = $(e.target).val();

      if (val) {
        this.service.galleryModel.GalleryMasterId = Number(val);
      } else {
        this.service.galleryModel.GalleryMasterId = 0;
      }
    });
  }
  selectedIsActive() {
    const selectEl = $('#isActive');
    setTimeout(() => {
      selectEl.select2();
    }, 10);

    selectEl.on('change', (e: any) => {
      const val = $(e.target).val();
      if (val === 'true') this.service.galleryModel.isActive = true;
      else if (val === 'false') this.service.galleryModel.isActive = false;
      else this.service.galleryModel.isActive = null as any;
    });
  }

  selectedIsFeatured() {
    const selectEl = $('#isFeatured');
    setTimeout(() => {
      selectEl.select2();
    }, 10);

    selectEl.on('change', (e: any) => {
      const val = $(e.target).val();
      if (val === 'true') this.service.galleryModel.isFeatured = true;
      else if (val === 'false') this.service.galleryModel.isFeatured = false;
      else this.service.galleryModel.isFeatured = null as any;
    });
  }

  // Fetch Gallery Category List
  fetchGalleryCategory() {
    this.isLoading = true;
    this.service.getGalleryCategory().subscribe({
      next: (res: any) => {

        this.galleryCategory = res;
        this.isLoading = false;

      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // Fetch Gallery List
  fetchgalleryList() {
    this.isLoading = true;
    this.service.getGalleryList().subscribe({
      next: (res: any) => {
        this.galleryList = res.data;
        this.filteredgalleryList = res.data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  filterCategories() {
    if (!this.searchTerm?.trim()) {
      this.filteredgalleryList = this.galleryList;
      return;
    }
    const search = this.searchTerm.toLowerCase().trim();
    this.filteredgalleryList = this.galleryList.filter(item =>
      item.title?.toLowerCase().includes(search) || item.description?.toLowerCase().includes(search)
    );
  }

  // validateGallery()
  validateGallery(): boolean {
    const model = this.service.galleryModel;

    if (!model.title || model.title.trim() === '') {
      this.toastr.error('Please enter a gallery title.');
      return false;
    }

    if (!model.GalleryMasterId || Number(model.GalleryMasterId) === 0) {
      this.toastr.error('Please select a Master Category.');
      return false;
    }

    if (model.galleryId === 0 && !this.selectedFile) {
      this.toastr.error('Please select an image for the new gallery item.');
      return false;
    }

    return true;
  }

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

  saveGallery() {
    if (!this.validateGallery()) {
      return;
    }

    const formData = new FormData();
    const model = this.service.galleryModel;

    formData.append('title', (model.title || '').trim());

    formData.append('galleryMasterId', String(model.GalleryMasterId));
    formData.append('galleryId', String(model.galleryId));
    formData.append('description', (model.description || '').trim());
    formData.append('displayOrder', String(model.displayOrder));

    const isActiveValue = model.isActive ? 'true' : 'false';
    formData.append('isActive', isActiveValue);

    const isFeaturedValue = model.isFeatured ? 'true' : 'false';
    formData.append('isFeatured', isFeaturedValue);

    // image selection handling
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }
    else if (model.galleryId > 0 && model.imageUrl) {
      formData.append('Image', model.imageUrl);
    }

    this.isLoading = true;

    if (model.galleryId === 0) {
      this.service.postGallery(formData).subscribe({
        next: (res: any) => {
          this.toastr.success('Gallery item added successfully');
          this.fetchgalleryList();
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
      this.service.postGallery(formData).subscribe({
        next: (res: any) => {
          this.toastr.success('Gallery item updated successfully');
          this.fetchgalleryList();
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

  getGalleryId(ID: number) {
    this.isLoading = true;
    this.service.getGalleryById(ID).subscribe({
      next: (res: any) => {
        this.service.galleryModel = {
          galleryId: res.data.galleryId ?? 0,
          GalleryMasterId: res.data.galleryMasterId ?? 0,
          title: res.data.title ?? '',
          description: res.data.description ?? '',
          image: res.data.image ?? '',
          imageUrl: res.data.imageUrl ?? '',
          displayOrder: res.data.displayOrder ?? 0,
          isFeatured: res.data.isFeatured ?? false,
          isActive: res.data.isActive ?? true
        };

        this.imagePreview = res.data.imageUrl ? this.baseurl + res.data.imageUrl : null;
        this.selectedFile = null;

        setTimeout(() => {
          $('#GalleryMasterId').val(String(res.data.galleryMasterId)).trigger('change');
        }, 0);

        setTimeout(() => {
          $('#isFeatured').val(String(res.data.isFeatured)).trigger('change');
        }, 0);

        setTimeout(() => {
          $('#isActive').val(String(res.data.isActive)).trigger('change');
        }, 0);

        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  deleteGallery(ID: number) {
    if (!confirm('Are you sure you want to delete this gallery item ?')) return;

    this.isLoading = true;
    this.service.deleteGalleryById(ID).subscribe({
      next: (res: any) => {
        this.toastr.success('Item removed from Gallery');
        this.fetchgalleryList();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  reset() {
    this.service.galleryModel = {
      galleryId: 0,
      GalleryMasterId: 0,
      title: '',
      description: '',
      image: '',
      imageUrl: '',
      displayOrder: 0,
      isFeatured: false,
      isActive: true
    };


    $('#GalleryMasterId').val('').trigger('change');
    $('#isFeatured').val('false').trigger('change');
    $('#isActive').val('true').trigger('change');

    this.selectedFile = null;
    this.imagePreview = null;
  }
}