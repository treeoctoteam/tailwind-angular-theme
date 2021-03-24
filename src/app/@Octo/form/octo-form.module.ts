import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { OctoFormComponent } from './octo-form.component';
import { OctoFieldComponent } from './components/octo-field/octo-field.component';
import { OctoSectionComponent } from './components/octo-section/octo-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValueAccessorDirective } from './directives/value-accessor.directive';
import { OctoFormService } from './octo-form.service';

@NgModule({
  declarations: [OctoFormComponent, OctoFieldComponent, OctoSectionComponent, ValueAccessorDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [OctoFormComponent],
  providers: [OctoFormService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OctoFormModule { }
