

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { galleryCategoryModel } from './gallery-category.model';
import { Endpoint } from './gallery-category-Urls';


@Injectable({
  providedIn: 'root',
})
export class GalleryCategoryService {
  private baseurl = environment.apiBaseUrl;

  galleryCategoryModel: galleryCategoryModel = new galleryCategoryModel();

  constructor(private http: HttpClient) { }

  getGalleryCategories() {
    return this.http.get(`${this.baseurl}${Endpoint.GalleryCategory}`);
  }

  getGalleryCategoryById(id: number) {
    return this.http.get(`${this.baseurl}${Endpoint.GalleryCategoryById}/${id}`);
  }


  postGalleryCategory(data: any) {
    return this.http.post(`${this.baseurl}${Endpoint.CreateGalleryCategory}`, data);
  }


  deleteGalleryCategory(id: number) {
    return this.http.delete(`${this.baseurl}${Endpoint.deleteGalleryCategory}/${id}`);
  }




}

