import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchService } from '../../shared/services/global-search.service';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardConfigService } from './services/dashboard-config.service';
import { LayoutComponentsModule } from '../../shared/components/layout-components.module';
import { NavigationGuard } from 'src/app/core/guards/navigation.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("../../pages/pages.module").then((m) => m.PagesModule),
        canActivate: [NavigationGuard]
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
