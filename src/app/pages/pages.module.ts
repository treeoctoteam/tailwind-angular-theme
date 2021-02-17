import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq/faq.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { DefaultLandingComponent } from './landingpage/default-landing/default-landing.component';


const routes: Routes = [
  { path: 'faq', component: FaqComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'not-found', component: NotfoundComponent },
  {
    path: "**", pathMatch: "full", redirectTo: "not-found"
  }
];

@NgModule({
  declarations: [
    FaqComponent,
    ContactsComponent,
    NotfoundComponent,
    DefaultLandingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
