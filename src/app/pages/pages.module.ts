import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq/faq.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';


const routes: Routes = [
  { path: 'faq', component: FaqComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'notfound', component: NotfoundComponent },
  {
    path: "**", pathMatch: "full", redirectTo: "notfound"
  }
];

@NgModule({
  declarations: [FaqComponent, ContactsComponent, NotfoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
