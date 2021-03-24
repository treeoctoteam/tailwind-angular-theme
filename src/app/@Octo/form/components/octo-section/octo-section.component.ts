import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormGroup } from '@angular/forms';
import { OctoSectionModel } from '../../models/core/octo-section.model';
import { createSectionForm, OctoFormService } from '../../octo-form.service';

@Component({
  selector: 'octo-section',
  templateUrl: './octo-section.component.html',
  styleUrls: ['./octo-section.component.scss'],
})
export class OctoSectionComponent implements OnInit, ControlValueAccessor {

  @Input() section: OctoSectionModel;

  public onTouched: () => void = () => {};

  sectionForm: FormGroup;

  constructor(public formService: OctoFormService) {
    this.sectionForm = createSectionForm();
  }

  ngOnInit(): void {}

  get fieldsFormArray(): AbstractControl[] {
    return (this.sectionForm.get('fields') as FormArray).controls;
  }

  writeValue(val: any): void {
    val && this.sectionForm.setValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.sectionForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.sectionForm.disable() : this.sectionForm.enable();
  }
}
