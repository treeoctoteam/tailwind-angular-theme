import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ValueAccessorDirective } from './directives/value-accessor.directive';
import { IsLoggedDirective } from './directives/is-logged.directive';

@NgModule({
  declarations: [
    ValueAccessorDirective,
    FooterComponent,
    ContainerComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    IsLoggedDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    ContainerComponent,
    HeaderComponent,
    NavbarComponent,
    SidebarComponent,
    ValueAccessorDirective,
    IsLoggedDirective
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
