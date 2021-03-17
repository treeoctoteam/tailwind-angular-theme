import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigStartComponent } from './pages/config-start/config-start.component';
import { ConfigOverviewComponent } from './pages/config-overview/config-overview.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'overview',
    component: ConfigOverviewComponent,
  },
  {
    path: 'start',
    component: ConfigStartComponent,
  }
];


@NgModule({
  declarations: [ConfigStartComponent, ConfigOverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfiguratorModule { }
