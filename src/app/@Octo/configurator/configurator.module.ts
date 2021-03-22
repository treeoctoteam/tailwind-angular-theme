import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigStartComponent } from './pages/config-start/config-start.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfigOverviewComponent } from './pages/config-overview/config-overview.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { LayoutComponentsModule } from '../../layout/components/layout-components.module';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { OctoFormModule } from '../form/octo-form.module';
import { AppConfigFormComponent } from './components/app-config-form/app-config-form.component';

const routes: Routes = [
  {
    path: 'overview',
    component: ConfigOverviewComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'start',
    component: ConfigStartComponent,
    canActivate: [AuthGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'start' },
];


@NgModule({
  declarations: [ConfigStartComponent, ConfigOverviewComponent, AppConfigFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgJsonEditorModule,
    LayoutComponentsModule,
    OctoFormModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfiguratorModule { }
