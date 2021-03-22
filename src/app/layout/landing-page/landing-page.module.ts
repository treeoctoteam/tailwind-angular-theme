import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponentsModule } from '../components/layout-components.module';
import { NavigationGuard } from 'src/app/core/guards/navigation.guard';
import { I18nService } from 'src/app/core/services/i18n.service';
import { localeENLandingpage } from './i18n/en';
import { TranslateModule } from '@ngx-translate/core';
import { LandingpageConfigService } from './services/landingpage-config.service';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("../../pages/pages.module").then((m) => m.PagesModule),
        canActivateChild: [NavigationGuard]
      }
    ],
  },
];

@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    LayoutComponentsModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    LandingpageConfigService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingPageModule {
  constructor(i18nService: I18nService) {
    i18nService.loadTranslations(
      localeENLandingpage
    )
  }
}
