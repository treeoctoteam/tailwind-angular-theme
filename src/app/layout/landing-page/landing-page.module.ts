import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchService } from '../../shared/services/global-search.service';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponentsModule } from '../components/layout-components.module';
import { NavigationGuard } from 'src/app/core/guards/navigation.guard';
import { I18nService } from 'src/app/shared/services/i18n.service';
import { localeENLandingpage } from './i18n/en';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("../../pages/pages.module").then((m) => m.PagesModule),
        canActivateChild: [NavigationGuard]
      },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: '**', pathMatch: 'full', redirectTo: 'not-found' }
    ]
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
    GlobalSearchService
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
