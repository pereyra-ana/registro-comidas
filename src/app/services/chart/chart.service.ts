import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  url = environment.url_service;

  constructor(private http: HttpClient) { }

  getStartDate(start: Date): Date {
    if (start) {
      start.setHours(0);
      start.setMinutes(0);
      start.setSeconds(0);
      start.setMilliseconds(0);
    }
    return start;
  }

  getEndDate(end: Date): Date {
    if (end) {
      end.setHours(23);
      end.setMinutes(59);
      end.setSeconds(59);
      end.setMilliseconds(999);
    }
    return end;
  }

  getDataForChart(start: any, end: any, chartType: string): Observable<any> {
    start = this.getStartDate(start);
    end = this.getEndDate(end);

    return this.http.post<any>(`${this.url}/charts/data`, { startDate: start, endDate: end, chartType: chartType });
  }

}

