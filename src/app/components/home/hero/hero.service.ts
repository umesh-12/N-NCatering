

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Endpoint } from './hero-Urls';


@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private baseurl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getFeaturedGalleryList() {
    return this.http.get(`${this.baseurl}${Endpoint.featuredgalleryList}`);
  }




}

