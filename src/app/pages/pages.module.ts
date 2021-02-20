import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq/faq.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { DefaultLandingComponent } from './landingpage/default-landing/default-landing.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: "home" },
  {
    path: "**", pathMatch: "full", redirectTo: "not-found"
  },
  { path: 'faq', component: FaqComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'not-found', component: NotfoundComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [
    FaqComponent,
    ContactsComponent,
    NotfoundComponent,
    DefaultLandingComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule { }
