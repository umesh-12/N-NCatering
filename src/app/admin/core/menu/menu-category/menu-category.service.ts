

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoint } from './menu-category-Urls';
import { menuCategoryModel } from './menu-category.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuCategoryService {
  private baseurl = environment.apiBaseUrl;

  // अब एउटै साझा 'productsModel' मात्र राख्ने
  menuCategoryModel: menuCategoryModel = new menuCategoryModel();

  constructor(private http: HttpClient) { }

  getMenuCategory() {
    return this.http.get(`${this.baseurl}${Endpoint.MenuCategory}`);
  }

  getCategoryById(id: number) {
    return this.http.get(`${this.baseurl}${Endpoint.categoryId}/${id}`);
  }


  postMenuCategory(data: any) {
    return this.http.post(`${this.baseurl}${Endpoint.CreateMenuCategory}`, data);
  }


  deleteMenuCategory(id: number) {
    return this.http.delete(`${this.baseurl}${Endpoint.deleteMenuCategory}/${id}`);
  }




}

