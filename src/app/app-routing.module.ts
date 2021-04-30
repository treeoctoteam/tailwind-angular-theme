import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from './core/guards/navigation.guard';
import { RedirectComponent } from './shared/components/redirect/redirect.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [NavigationGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [NavigationGuard]
  },
  {
    path: 'public',
    loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule),
    canActivate: [NavigationGuard]
  },
  {
    path: 'configurator',
    loadChildren: () => import('./modules/env-configurator/env-configurator.module').then(m => m.EnvConfiguratorModule),
    canActivate: [NavigationGuard]
  },
  {
    path: 'redirect',
    component: RedirectComponent
  },
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'redirect'
  },
  {
    path: '**',
    redirectTo: 'public/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
