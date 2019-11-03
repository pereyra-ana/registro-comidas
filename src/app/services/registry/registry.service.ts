import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registry } from 'src/app/model/registry';
import { environment } from '../../../environments/environment';
import { registerLocaleData } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  url = environment.url_service;

  constructor(private http: HttpClient) { }

  getAll(start: any, end: any): Observable<Registry[]> {
    return this.http.post<Registry[]>(`${this.url}/registries/filter`, { startDate : start, endDate : end});
  }

  addRegistries(registriesJson: any): Observable<any> {
    return this.http.post<any>(`${this.url}/registries/all`, registriesJson);
  }

  createRegistry(registries: Registry[]): Observable<any> {
    return this.http.post<Registry[]>(`${this.url}/registries/`, registries);
  }

  updateRegistry(registry: Registry): Observable<any> {
    return this.http.put<Registry>(`${this.url}/registries/${registry._id}`, registry);
  }

  deleteRegistry(registry: Registry): Observable<any> {
    return this.http.delete<Registry>(`${this.url}/registries/${registry._id}`);
  }
}
