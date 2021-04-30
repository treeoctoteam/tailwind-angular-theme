import { RedirectComponent } from '../../shared/components/redirect/redirect.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NavigationGuard } from '../../core/guards/navigation.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OctoFormModule } from 'src/app/@Octo/form/octo-form.module';
import { OverviewUserComponent } from './pages/overview-user/overview-user.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'redirect' },
      { path: 'overview-user', component: OverviewUserComponent },
      {
        path: '',
        loadChildren: () =>
          import('../../pages/pages.module').then((m) => m.PagesModule),
        canActivateChild: [NavigationGuard],
      },
      {
        path: 'redirect', component: RedirectComponent
      },
      {
        path: '**',
        redirectTo: 'not-found'
      }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent, OverviewUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    OctoFormModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule { }
