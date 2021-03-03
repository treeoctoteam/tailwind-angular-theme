import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./layout/dashboard/dashboard.module').then(m => m.DashboardModule),
    // canActivate: [AuthGuardService],
  },
  {
    path: 'workflow',
    loadChildren: () => import('./layout/workflow/workflow.module').then(m => m.WorkflowModule),
    // canActivate: [AuthGuardService],
  },
  {
    path: '',
    loadChildren: () => import('./layout/landing-page/landing-page.module').then(m => m.LandingPageModule),
    // canActivate: [AuthGuardService],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'notfound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
