import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url = environment.url_service;

  constructor(private http: HttpClient) { }

  addPushSubscriber(sub: any): Observable<any> {
    return this.http.post<any>(`${this.url}/notifications/subscribers`, { sub: sub });
  }

  send() {
    return this.http.post('/notifications/new', null);
  }
}
