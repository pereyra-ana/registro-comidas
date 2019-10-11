import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatInputModule, MatListModule, MatSidenavModule, MatSnackBarModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistryListComponent } from './registry/list/registry-list.component';
import { RegistryNewComponent } from './registry/new/registry-new.component';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RegistryListComponent,
    RegistryNewComponent,
    PageNotFoundComponent
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
