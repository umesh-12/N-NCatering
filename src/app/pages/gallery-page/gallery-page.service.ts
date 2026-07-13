


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoint } from './gallery-page-Urls';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GalleryPageService {
  private baseurl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  getGalleryList() {
    return this.http.get(`${this.baseurl}${Endpoint.galleryList}`);
  }

  getGalleryCategories() {
    return this.http.get(`${this.baseurl}${Endpoint.galleryCategory}`);
  }

}

