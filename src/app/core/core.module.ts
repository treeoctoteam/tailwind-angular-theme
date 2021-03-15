import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { CustomDialogTemplateComponent, DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AlertComponent,
    DialogComponent,
    CustomDialogTemplateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    DialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }
