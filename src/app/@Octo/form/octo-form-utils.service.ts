import { Injectable } from '@angular/core';
import { OctoFormModel } from './models/octo-form.model';
import { OctoSectionModel } from './models/octo-section.model';

@Injectable()
export class OctoFormUtilsService {
  constructor() {}

  public getSectionFormMap(
    form: OctoFormModel
  ): { id: string; name: string }[] {
    const sections: { id: string; name: string }[] = [];
    form.sections.forEach((s) => {
      const section: { id: string; name: string } = {
        id: s.id,
        name: s.name,
      };
      sections.push(section);
    });
    return sections;
  }

  public getFieldFormMap(
    section: OctoSectionModel
  ): { id: string; name: string; value: string | number }[] {
    const fields: { id: string; name: string; value: string | number }[] = [];
    section.fields.forEach((f) => {
      const field: { id: string; name: string; value: string | number } = {
        id: f.id,
        name: f.name,
        value: f.value,
      };
      fields.push(field);
    });
    return fields;
  }
}
