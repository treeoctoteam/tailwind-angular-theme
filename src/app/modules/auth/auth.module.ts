import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { UserDataComponent } from './pages/user-data/user-data.component';
import { LockComponent } from './pages/lock/lock.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { EmailVerifyComponent } from './pages/email-verify/email-verify.component';

const routes: Routes = [
  { path: 'user-data', component: UserDataComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'lock', component: LockComponent },
  { path: 'verify-email', component: EmailVerificationComponent },
  { path: 'email-verified', component: EmailVerifyComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserDataComponent,
    LockComponent,
    LoginFormComponent,
    RegisterFormComponent,
    EmailVerificationComponent,
    EmailVerifyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
