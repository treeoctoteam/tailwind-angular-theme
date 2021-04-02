import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { OctoFormComponent } from './octo-form.component';
import { OctoFieldComponent } from './components/octo-field/octo-field.component';
import { OctoSectionComponent } from './components/octo-section/octo-section.component';
import { CommonModule } from '@angular/common';
import { OctoFormService } from './octo-form.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OctoFormComponent,
    OctoFieldComponent,
    OctoSectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    OctoFormComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    OctoFormService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OctoFormModule { }
