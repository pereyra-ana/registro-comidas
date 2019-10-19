import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foodRegistry';
  public isMobileResolution: boolean;
  public isSivenavOpen: boolean = false;

  constructor() {
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  sidenavToggle(): void {
    this.isSivenavOpen = !this.isSivenavOpen;
  }
}
