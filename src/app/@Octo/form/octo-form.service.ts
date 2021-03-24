import { Injectable } from '@angular/core';
import { OctoFormModel } from './models/core/octo-form.model';
import { OctoFieldModel } from './models/core/octo-field.model';
import { OctoSectionModel } from './models/core/octo-section.model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export const createOctoForm = (): FormGroup => {
  return new FormGroup({
    id: new FormControl(''),
    title: new FormControl(''),
    class: new FormControl(''),
    style: new FormControl(''),
    sections: new FormArray([]),
    audit: createAuditForm(),
    mode: new FormControl(''),
  });
};

export const createSectionForm = (): FormGroup => {
  return new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    class: new FormControl(''),
    style: new FormControl(''),
    validation: new FormGroup({
      required: new FormControl(''),
    }),
    fields: new FormArray([]),
    audit: createAuditForm(),
  });
};

export const createFieldForm = (): FormGroup => {
  return new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    disabled: new FormControl(''),
    readonly: new FormControl(''),
    value: new FormControl(''),
    placeholder: new FormControl(''),
    appearance: new FormControl(''),
    type: new FormControl(''),
    clearable: new FormControl(''),
    label: new FormControl(''),
    labelColor: new FormControl(''),
    borderColor: new FormControl(''),
    placeholderColor: new FormControl(''),
    textColor: new FormControl(''),
    backgroundColor: new FormControl(''),
    options: new FormArray([]),
    // validation?: Partial<OctoFieldValidationModel>;
    sectionId: new FormControl(''),
    audit: createAuditForm(),
  });
};

export const createFieldOptionForm = (): FormGroup => {
  return new FormGroup({
    value: new FormControl(''),
    label: new FormControl(''),
  });
};

export const createAuditForm = (): FormGroup => {
  return new FormGroup({
    creationDate: new FormControl(''),
    updateDate: new FormControl(''),
    creationUserId: new FormControl(''),
    updateUserId: new FormControl(''),
  });
};

@Injectable({
  providedIn: 'root', // TODO remove providedIn: 'root'
})
export class OctoFormService {

  constructor() {}

  initOctoForm(form: OctoFormModel): FormGroup {
    const octoFormGroup = createOctoForm();
    const octoSectionsFormArray = octoFormGroup.get('sections') as FormArray;
    const sectionsLength = form.sections.length;
    if (sectionsLength) {
      for (let i = 0; i < sectionsLength; i++) {
        octoSectionsFormArray.push(createSectionForm());
      }
    }
    if (octoSectionsFormArray.length) {
      for (let i = 0; i < octoSectionsFormArray.length; i++) {
        (octoSectionsFormArray.at(i).get('fields') as FormArray).push(createFieldForm());
      }
    }
    octoFormGroup.patchValue(form);
    return octoFormGroup;
  }

  // public setFieldValue(value: any, fieldID: number, sectionID: number) {
  //   // @ts-ignore
  //   this.form?.sections
  //     ?.find((s: OctoSectionModel) => s.id === sectionID)
  //     .fields.find((f: OctoFieldModel) => f.id === fieldID).value = value;
  // }

  // public getFielt(fieldID: number, sectionID: number) {
  //   // @ts-ignore
  //   return this.form?.sections
  //     ?.find((s: OctoSectionModel) => s.id == sectionID)
  //     .fields.find((f: OctoFieldModel) => f.id == fieldID);
  // }

  // public getSection(sectionID: any) {
  //   // return this.form.sections.find((s) => s.id == sectionID);
  // }
}
