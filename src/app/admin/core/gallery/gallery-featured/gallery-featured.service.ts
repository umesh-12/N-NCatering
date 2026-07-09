
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { galleryFeaturedModel } from './gallery-featured.model';
import { Endpoint } from './gallery-featured-Urls';
import { environment } from '../../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class GalleryFeaturedService {
  private baseurl = environment.apiBaseUrl;

  galleryFeaturedModel: galleryFeaturedModel = new galleryFeaturedModel();

  constructor(private http: HttpClient) { }

  getGalleryFeatured() {
    return this.http.get(`${this.baseurl}${Endpoint.GalleryFeatured}`);
  }



}

