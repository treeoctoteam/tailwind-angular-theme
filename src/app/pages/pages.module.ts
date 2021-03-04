import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq/faq.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './not-found/not-found.component';
import { UserDataComponent } from './user-data/user-data.component';


const routes: Routes = [
  { path: 'faq', component: FaqComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'user-data', component: UserDataComponent },
  { path: 'not-found', component: NotfoundComponent },
  // {
  //   path: "**", pathMatch: "full", redirectTo: "not-found"
  // }
];

@NgModule({
  declarations: [
    FaqComponent,
    ContactsComponent,
    NotfoundComponent,
    UserDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
