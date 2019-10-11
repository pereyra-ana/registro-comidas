import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { RegistryListComponent } from './registry/registry-list/registry-list.component';
import { RegistryNewComponent } from './registry/registry-new/registry-new.component';


const routes: Routes = [
  //{ path: 'app', component: AppComponent },
  //{ path: 'menu', component: MenuComponent },
  { path: 'registry/list',        component: RegistryListComponent },
  { path: 'registry/new',        component: RegistryNewComponent },
  //{ path: '',   redirectTo: '/app', pathMatch: 'full' },
  { path: '**', component: MainContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
