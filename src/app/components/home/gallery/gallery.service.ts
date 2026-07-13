
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Endpoint } from './gallery-Url';


@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private baseurl = environment.apiBaseUrl;



  constructor(private http: HttpClient) { }

  getGalleryList() {
    return this.http.get(`${this.baseurl}${Endpoint.galleryList}`);
  }




}

