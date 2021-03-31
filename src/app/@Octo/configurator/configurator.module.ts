import { I18nService } from 'src/app/core/services/i18n.service';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigStartComponent } from './pages/config-start/config-start.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfigOverviewComponent } from './pages/config-overview/config-overview.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { OctoFormModule } from '../form/octo-form.module';
import { AppConfigFormComponent } from './components/app-config-form/app-config-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
    SharedModule,
    OctoFormModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfiguratorModule {
  constructor(i18nService: I18nService) {
    i18nService.getCountries();
  }
 }
