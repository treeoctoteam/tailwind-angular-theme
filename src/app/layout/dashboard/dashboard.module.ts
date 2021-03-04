import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchService } from '../../shared/services/global-search.service';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardConfigService } from './services/dashboard-config.service';
import { LayoutComponentsModule } from '../../shared/components/layout-components.module';
import { NavigationGuard } from '../../core/guards/navigation.guard';

export const DASHBOARD_LAYOUT_CONFIG_PATH = 'assets/config/dashboard-config.json';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("../../pages/pages.module").then((m) => m.PagesModule),
        canActivateChild: [NavigationGuard]
      }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    LayoutComponentsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    GlobalSearchService,
    DashboardConfigService
  ]
})
export class DashboardModule {}
