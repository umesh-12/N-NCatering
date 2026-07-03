
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
;
import { environment } from '../../../environments/environment';
import { Endpoint } from './menu-single-Urls';

@Injectable({
  providedIn: 'root',
})
export class MenuSingleService {
  private baseurl = environment.apiBaseUrl;


  constructor(private http: HttpClient) { }

  getPackageDetailById(id: number) {
    return this.http.get(`${this.baseurl}${Endpoint.packageDetailById}/${id}`);
  }


}

