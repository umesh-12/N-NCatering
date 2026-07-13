

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoint } from './package-menu-Urls';
import { packageMenuItemModel, packageMenuModel } from './package-menu.model';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PackageMenuService {
  private baseurl = environment.apiBaseUrl;

  packageMenuModel: packageMenuModel = new packageMenuModel();
  packageMenuItemModel: packageMenuItemModel = new packageMenuItemModel();

  constructor(private http: HttpClient) { }

  getmenuCategory() {
    return this.http.get(`${this.baseurl}${Endpoint.menuCategory}`);
  }


  getPackageMenuList() {
    return this.http.get(`${this.baseurl}${Endpoint.getPackageMenu}`);
  }

  postPackageMenu(data: any) {
    return this.http.post(`${this.baseurl}${Endpoint.savePackageMenu}`, data);
  }


  getPackageMenuById(id: number) {
    return this.http.get(`${this.baseurl}${Endpoint.getPackageMenuById}/${id}`);
  }

  deletePackageMenuById(id: number) {
    return this.http.delete(`${this.baseurl}${Endpoint.deletePackageMenuById}/${id}`);
  }

  //Packag Menu Item below

  // For  popop use

  getMenuItemList() {
    return this.http.get(`${this.baseurl}${Endpoint.MenuItem}`);
  }

  // get package Menu Item list
  getPackageMenuItemList(id: number) {
    return this.http.get(`${this.baseurl}${Endpoint.packageMenuItemList(id)}`);
  }

  // post package Menu Item
  postPackageMenuItem(packageMenuId: number, menuItemId: number) {
    // URL को पछाडि , {} थपेर खाली बडी पठाइदिने
    return this.http.post(`${this.baseurl}${Endpoint.postPackageMenuItem(packageMenuId, menuItemId)}`, {});
  }
  // delete package Menu Item
  deletePackageMenuItem(packageMenuId: number, menuItemId: number) {
    // १. Endpoint लाई फङ्सन जस्तै कल गरेर ID हरू पास गर्ने () भित्र
    // २. POST को body मा खाली अब्जेक्ट {} पठाइदिने
    return this.http.delete(
      `${this.baseurl}${Endpoint.deletePackageMenuItem(packageMenuId, menuItemId)}`,
      {}
    );
  }




}

