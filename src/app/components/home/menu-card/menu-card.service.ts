
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Endpoint } from './menu-card-Urls';

@Injectable({
  providedIn: 'root',
})
export class MenuCardService {
  private baseurl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  getPackageList() {
    return this.http.get(`${this.baseurl}${Endpoint.Package}`);
  }


}

