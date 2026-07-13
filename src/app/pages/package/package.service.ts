


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoint } from './package-Urls';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private baseurl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  getPackageList() {
    return this.http.get(`${this.baseurl}${Endpoint.Package}`);
  }


}

