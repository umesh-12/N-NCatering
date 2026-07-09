

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoint } from './gallery-Urls';
import { galleryModel } from './gallery.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private baseurl = environment.apiBaseUrl;

  // अब एउटै साझा 'productsModel' मात्र राख्ने
  galleryModel: galleryModel = new galleryModel();

  constructor(private http: HttpClient) { }

  getGalleryList() {
    return this.http.get(`${this.baseurl}${Endpoint.galleryList}`);
  }

  postGallery(data: any) {
    return this.http.post(`${this.baseurl}${Endpoint.saveGallery}`, data);
  }


  getGalleryById(id: number) {
    return this.http.get(`${this.baseurl}${Endpoint.getGalleryById}/${id}`);
  }

  deleteGalleryById(id: number) {
    return this.http.delete(`${this.baseurl}${Endpoint.deleteGalleryById}/${id}`);
  }


  getGalleryCategory() {
    return this.http.get(`${this.baseurl}${Endpoint.galleryCategory}`);
  }


}

