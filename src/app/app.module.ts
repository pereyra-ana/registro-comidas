import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatSidenavModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartBarComponent } from './chart/chart-bar/chart-bar.component';
import { ChartPieComponent } from './chart/chart-pie/chart-pie.component';
import { ChartComponent } from './chart/chart.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MenuComponent } from './menu/menu.component';
import { RegistryListComponent } from './registry/registry-list/registry-list.component';
import { RegistryNewComponent } from './registry/registry-new/registry-new.component';
import { SantiComponent } from './santi/santi.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RegistryListComponent,
    RegistryNewComponent,
    MainContentComponent,
    ChartComponent,
    MainContentComponent,
    ChartPieComponent,
    ChartBarComponent,
    SantiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    ChartsModule,
    MatTabsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
