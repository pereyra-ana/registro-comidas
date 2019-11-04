import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule, MAT_DATE_LOCALE } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartsModule } from 'ng2-charts';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartBarComponent } from './components/chart/chart-bar/chart-bar.component';
import { ChartPieComponent } from './components/chart/chart-pie/chart-pie.component';
import { ChartComponent } from './components/chart/chart.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegistryFormComponent } from './components/registry/registry-form/registry-form.component';
import { RegistryListComponent } from './components/registry/registry-list/registry-list.component';
import { ResponseHttpInterceptor } from './interceptors/http/response-http.interceptor';
import { LoaderInterceptor } from './interceptors/loader/loader.interceptor';
import { LoaderService } from './services/loader/loader.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RegistryListComponent,
    MainContentComponent,
    ChartComponent,
    ChartPieComponent,
    ChartBarComponent,
    LoaderComponent,
    RegistryFormComponent,
    DialogConfirmComponent,
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
    HttpClientModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FontAwesomeModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseHttpInterceptor, multi: true },

    LoaderService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RegistryFormComponent,
    DialogConfirmComponent
  ],
})
export class AppModule { }
