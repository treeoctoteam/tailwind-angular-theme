import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqComponent } from './faq/faq.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './not-found/not-found.component';
import { UserDataComponent } from './user-data/user-data.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'user-data', component: UserDataComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'not-found', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    FaqComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContactsComponent,
    NotfoundComponent,
    UserDataComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
