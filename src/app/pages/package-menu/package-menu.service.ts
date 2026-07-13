
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
;
import { environment } from '../../../environments/environment';
import { Endpoint } from './package-menu-Urls';

@Injectable({
  providedIn: 'root',
})
export class PackageMenuService {
  private baseurl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  // getPackageMenu(id: number) {
  //   return this.http.get(`${this.baseurl}${Endpoint.packageDetailById}/${id}`);
  // }

    getPackageMenuById(id: number) {
    return this.http.get(`${this.baseurl}${Endpoint.PackageMenuById}/${id}`);
  }


}

