import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { OctoFormComponent } from './octo-form.component';
import { OctoFieldComponent } from './components/octo-field/octo-field.component';
import { OctoSectionComponent } from './components/octo-section/octo-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [OctoFormComponent, OctoFieldComponent, OctoSectionComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  exports: [OctoFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OctoFormModule {}
