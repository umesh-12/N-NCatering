

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Endpoint } from './package-Urls';
import { packageModel } from './package.model';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private baseurl = environment.apiBaseUrl;

  // अब एउटै साझा 'productsModel' मात्र राख्ने
  packageModel: packageModel = new packageModel();

  constructor(private http: HttpClient) { }

  getPackageList() {
    return this.http.get(`${this.baseurl}${Endpoint.packageList}`);
  }

   postPackage(data: any) {
    return this.http.post(`${this.baseurl}${Endpoint.savePackage}`, data);
  }


  // getMenuItemById(id: number) {
  //   return this.http.get(`${this.baseurl}${Endpoint.getById}/${id}`);
  // }

  // deleteMenuItem(id: number) {
  //   return this.http.delete(`${this.baseurl}${Endpoint.DeleteMenuItem}/${id}`);
  // }


 

}

