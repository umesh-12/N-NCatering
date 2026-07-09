


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoint } from './meni-item-Urls';
import { menuItemModel } from './menu-item.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService {
  private baseurl = environment.apiBaseUrl;

  // अब एउटै साझा 'productsModel' मात्र राख्ने
  menuItemModel: menuItemModel = new menuItemModel();

  constructor(private http: HttpClient) { }

  getMenuItemList() {
    return this.http.get(`${this.baseurl}${Endpoint.MenuItem}`);
  }

  getMenuItemById(id: number) {
    return this.http.get(`${this.baseurl}${Endpoint.getById}/${id}`);
  }

  deleteMenuItem(id: number) {
    return this.http.delete(`${this.baseurl}${Endpoint.DeleteMenuItem}/${id}`);
  }


  postMenuItem(data: any) {
    return this.http.post(`${this.baseurl}${Endpoint.createMenuItem}`, data);
  }

  getmenuCategory() {
    return this.http.get(`${this.baseurl}${Endpoint.menuCategory}`);
  }





}

