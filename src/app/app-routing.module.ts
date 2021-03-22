import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from './core/guards/navigation.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./layout/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [NavigationGuard]
  },
  {
    path: 'workflow',
    loadChildren: () => import('./layout/workflow/workflow.module').then(m => m.WorkflowModule),
    canActivate: [NavigationGuard]
  },
  {
    path: 'landingpage',
    loadChildren: () => import('./layout/landing-page/landing-page.module').then(m => m.LandingPageModule),
    canActivate: [NavigationGuard]
  },
  {
    path: 'configurator',
    loadChildren: () => import('./configurator/configurator.module').then(m => m.ConfiguratorModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'notfound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
