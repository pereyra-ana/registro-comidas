import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MatSidenav]
})
export class MenuComponent {

  @ViewChild('responsiveSidenav', { static: false }) public sidenav: MatSidenav;

  @Input()
  isMobileResolution: boolean;

  @Input()
  set isSivenavOpen(isSivenavOpen: boolean) {
    if (this.sidenav)
      this.sidenav.toggle();
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }

}