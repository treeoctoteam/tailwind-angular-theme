import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigStartComponent } from './pages/config-start/config-start.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfigOverviewComponent } from './pages/config-overview/config-overview.component';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { LayoutComponentsModule } from '../layout/components/layout-components.module';

const routes: Routes = [
  {
    path: 'overview',
    component: ConfigOverviewComponent,
  },
  {
    path: 'start',
    component: ConfigStartComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'start' },
];


@NgModule({
  declarations: [ConfigStartComponent, ConfigOverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgJsonEditorModule,
    LayoutComponentsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfiguratorModule { }
