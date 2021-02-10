import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchService } from '../services/global-search.service';
import { NavbarDefaultComponent } from './components/navbar-default/navbar-default.component';
import { FooterDefaultComponent } from './components/footer-default/footer-default.component';
import { GridComponent } from './components/grid/grid.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SidebarDefaultComponent } from './components/sidebar-default/sidebar-default.component';
import { DashboardConfigService } from './services/dashboard-config.service';
import { PagesModule } from 'src/app/pages/pages.module';


const routes: Routes = [{
  path: '', component: DashboardComponent, children: [
    {
      path: "",
      loadChildren: () => import("../../pages/pages.module").then((m) => m.PagesModule),
    }]
}];
@NgModule({
  declarations: [DashboardComponent, NavbarDefaultComponent, FooterDefaultComponent, GridComponent, SidebarDefaultComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [GlobalSearchService, DashboardConfigService]
})
export class DashboardModule { }
