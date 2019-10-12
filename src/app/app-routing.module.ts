import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { RegistryListComponent } from './components/registry/registry-list/registry-list.component';
import { RegistryNewComponent } from './components/registry/registry-new/registry-new.component';


const routes: Routes = [
  //{ path: 'app', component: AppComponent },
  //{ path: 'menu', component: MenuComponent },
  { path: 'registry/list',        component: RegistryListComponent },
  { path: 'registry/new',        component: RegistryNewComponent },
  { path: 'charts',        component: ChartComponent },
  //{ path: '',   redirectTo: '/app', pathMatch: 'full' },
  { path: '**', component: MainContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
