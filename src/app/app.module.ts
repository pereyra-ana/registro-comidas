import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatSidenavModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartBarComponent } from './components/chart/chart-bar/chart-bar.component';
import { ChartPieComponent } from './components/chart/chart-pie/chart-pie.component';
import { ChartComponent } from './components/chart/chart.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegistryListComponent } from './components/registry/registry-list/registry-list.component';
import { RegistryNewComponent } from './components/registry/registry-new/registry-new.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RegistryListComponent,
    RegistryNewComponent,
    MainContentComponent,
    ChartComponent,
    ChartPieComponent,
    ChartBarComponent,
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
    MatNativeDateModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
