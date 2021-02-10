import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchService } from '../services/global-search.service';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule, Routes } from '@angular/router';

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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [GlobalSearchService]
})
export class LandingPageModule { }
