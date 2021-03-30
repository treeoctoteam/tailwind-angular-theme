import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContainerComponent } from './components/container/container.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ValueAccessorDirective } from './directives/value-accessor.directive';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    ValueAccessorDirective,
    FooterComponent,
    ContainerComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    LoginFormComponent,
    RegisterFormComponent,
    FooterComponent,
    ContainerComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    ValueAccessorDirective
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
