import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ResultMessage } from './models/result-message.model';
import { OctoSectionModel } from './models/octo-section.model';
import { OctoFieldModel } from './models/octo-field.model';
import { OctoFormModel } from './models/octo-form.model';

@Injectable()
export class OctoFormService {
  private form: OctoFormModel;
  public $formChange = new Subject<OctoFormModel>();

  constructor() {}

  public InitializeForm(form: OctoFormModel): ResultMessage {
    const result: ResultMessage = new ResultMessage();
    if (form) {
      this.form = form;
      this.$formChange.next(this.form);
      result.SetSuccess('Form loaded.');
    } else {
      result.SetError('Form null or undefined.');
    }
    return result;
  }

  public setFieldValue(value: any, fieldID: string, sectionID: string) {
    const field = this.getField(fieldID, sectionID);
    if (field) {
      field.value = value;
    }
    this.$formChange.next(this.form);
  }

  private getField(fieldID: string, sectionID: string): OctoFieldModel | undefined {
    const section = this.getSection(sectionID);
    const field: OctoFieldModel | undefined = section?.fields.find(
      (f: OctoFieldModel) => f.id === fieldID
    );
    return field;
  }

  private getSection(sectionID: string): OctoSectionModel | undefined {
    return this.form.sections.find(s => s.id === sectionID);
  }


}
