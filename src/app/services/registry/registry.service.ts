import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registry } from 'src/app/model/registry';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  url = environment.url_service;

  constructor(private http: HttpClient) { }

  getAll(start: any, end: any): Observable<Registry[]> {
    return this.http.post<Registry[]>(`${this.url}/registries/filter`, { startDate : start, endDate : end});
  }

  addRegistry(registriesJson: any): Observable<any> {
    return this.http.post<any>(`${this.url}/registries`, registriesJson);
  }
}
