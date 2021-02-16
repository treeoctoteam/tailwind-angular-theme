import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchService } from '../services/global-search.service';
import { GridComponent } from '../components/grid/grid.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardConfigService } from './services/dashboard-config.service';
import { LayoutModule } from '../layout.module';

const routes: Routes = [{
  path: '', component: DashboardComponent, children: [
    {
      path: "",
      loadChildren: () => import("../../pages/pages.module").then((m) => m.PagesModule),
    }]
}];

@NgModule({
  declarations: [
    DashboardComponent,
    GridComponent,
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule.forChild(routes),
  ],
  providers: [GlobalSearchService, DashboardConfigService]
})
export class DashboardModule { }
