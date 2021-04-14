import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from 'src/app/core/guards/navigation.guard';
import { I18nService } from 'src/app/core/services/i18n.service';
import { localeENPublic } from './i18n/en';
import { TranslateModule } from '@ngx-translate/core';
import { PublicConfigService } from './services/public.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../../pages/pages.module').then((m) => m.PagesModule),
        canActivateChild: [NavigationGuard]
      },
      {
        path: 'home', component: HomeComponent,
        canActivateChild: [NavigationGuard]
      },
    ],
  },
];

@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PublicConfigService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicModule {
  constructor(i18nService: I18nService) {
    i18nService.loadTranslations(
      localeENPublic
    );
  }
}
