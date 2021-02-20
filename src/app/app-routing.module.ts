import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./layout/dashboard/dashboard.module').then(m => m.DashboardModule),
    // canActivate: [AuthGuardService],
  },
  {
    path: '',
    loadChildren: () => import('./layout/landing-page/landing-page.module').then(m => m.LandingPageModule),
    // canActivate: [AuthGuardService],
  },
  { path: "**", pathMatch: "full", redirectTo: "not-found" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
