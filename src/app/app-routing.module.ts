import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistryListComponent } from './registry/list/registry-list.component';
import { RegistryNewComponent } from './registry/new/registry-new.component';
import { MenuComponent } from './menu/menu.component';


const routes: Routes = [
  //{ path: 'app', component: AppComponent },
  //{ path: 'menu', component: MenuComponent },
  { path: 'registry/list',        component: RegistryListComponent },
  { path: 'registry/new',        component: RegistryNewComponent },
  //{ path: '',   redirectTo: '/app', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
