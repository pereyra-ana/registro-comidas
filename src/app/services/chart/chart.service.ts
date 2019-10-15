import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  url = environment.url_service;

  constructor(private http: HttpClient) { }

  getDataForChart(start: any, end: any, chartType: string): Observable<any> {
    return this.http.post<any>(`${this.url}/charts/data`, { startDate : start, endDate : end, chartType: chartType});
  }

}

