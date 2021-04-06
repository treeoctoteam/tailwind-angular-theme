import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { CustomDialogTemplateComponent, DialogComponent } from './components/dialog/dialog.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
import { ThemeSelectComponent } from './components/theme-select/theme-select.component';

@NgModule({
  declarations: [
    AlertComponent,
    DialogComponent,
    CustomDialogTemplateComponent,
    SpinnerComponent,
    ThemeSelectComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    DialogComponent,
    SpinnerComponent,
    ThemeSelectComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule { }
