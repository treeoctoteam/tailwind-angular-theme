import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchService } from '../../shared/services/global-search.service';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponentsModule } from '../../shared/components/layout-components.module';
import { NavigationGuard } from 'src/app/core/guards/navigation.guard';

export const LANDINGPAGE_LAYOUT_CONFIG_PATH = 'assets/config/landing-config.json';

const routes: Routes = [{
  path: '', component: LandingPageComponent, children: [
    {
      path: "",
      loadChildren: () => import("../../pages/pages.module").then((m) => m.PagesModule),
      canActivateChild: [NavigationGuard]
    }]
}];

@NgModule({
  declarations: [
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    LayoutComponentsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    GlobalSearchService
  ]
})
export class LandingPageModule { }
