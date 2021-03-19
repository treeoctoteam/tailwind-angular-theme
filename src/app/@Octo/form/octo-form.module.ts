import { NgModule } from '@angular/core';
import { OctoFormComponent } from './octo-form.component';
import { OctoFieldComponent } from './components/octo-field/octo-field.component';
import { OctoSectionComponent } from './components/octo-section/octo-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OctoFormService } from './octo-form.service';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [OctoFormComponent, OctoFieldComponent, OctoSectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [OctoFormComponent],
  providers: [OctoFormService]
})
export class OctoFormModule { }
