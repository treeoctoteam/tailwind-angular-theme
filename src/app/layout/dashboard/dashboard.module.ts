import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalSearchService } from '../services/global-search.service';
import { NavbarDefaultComponent } from './components/navbar-default/navbar-default.component';
import { FooterDefaultComponent } from './components/footer-default/footer-default.component';
import { GridComponent } from './components/grid/grid.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [{ path: '', component: DashboardComponent }];
@NgModule({
  declarations: [DashboardComponent, NavbarDefaultComponent, FooterDefaultComponent, GridComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [GlobalSearchService]
})
export class DashboardModule { }
