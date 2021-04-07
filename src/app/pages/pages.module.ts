import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq/faq.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './not-found/not-found.component';
import { UserDataComponent } from '../modules/auth/pages/user-data/user-data.component';
import { LoginComponent } from '../modules/auth/pages/login/login.component';
import { RegisterComponent } from '../modules/auth/pages/register/register.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { LockComponent } from '../modules/auth/pages/lock/lock.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'not-found', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    FaqComponent,
    HomeComponent,
    NotfoundComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
