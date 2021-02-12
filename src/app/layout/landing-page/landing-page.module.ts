import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchService } from '../services/global-search.service';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderLandingComponent } from './components/header-landing/header-landing.component';
import { FooterLandingComponent } from './components/footer-landing/footer-landing.component';
import { ContainerLandingComponent } from '../components/container-landing/container-landing.component';

const routes: Routes = [{
  path: '', component: LandingPageComponent, children: [
    {
      path: "",
      loadChildren: () => import("../../pages/pages.module").then((m) => m.PagesModule),
    }]
}];

@NgModule({
  declarations: [
    LandingPageComponent,
    HeaderLandingComponent,
    FooterLandingComponent,
    ContainerLandingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [GlobalSearchService]
})
export class LandingPageModule { }
