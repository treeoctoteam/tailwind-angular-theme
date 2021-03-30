import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from './core/guards/navigation.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [NavigationGuard]
  },
  {
    path: 'workflow',
    loadChildren: () => import('./modules/workflow/workflow.module').then(m => m.WorkflowModule),
    canActivate: [NavigationGuard]
  },
  {
    path: 'landingpage',
    loadChildren: () => import('./modules/landing-page/landing-page.module').then(m => m.LandingPageModule),
    canActivate: [NavigationGuard]
  },
  {
    path: 'configurator',
    loadChildren: () => import('./@Octo/configurator/configurator.module').then(m => m.ConfiguratorModule)
  },
  {
    path: 'pdf-reader',
    loadChildren: () => import('./@Octo/pdf-reader/pdf-manager.module').then(m => m.PdfManagerModule)
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
