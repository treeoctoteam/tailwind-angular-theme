import { Injectable } from '@angular/core';
import { OctoFormModel } from './models/core/octo-form.model';
import { Observable, Subject } from 'rxjs';
import { ResultMessage } from './models/support/result-message.model';
import { OctoFieldModel } from './models/core/octo-field.model';
import { OctoSectionModel } from './models/core/octo-section.model';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

const FORM_CONFIG_URL = 'assets/ENForm.json';

@Injectable()
export class OctoFormService {
  private form: OctoFormModel;
  // @ts-ignore
  public $fakeForm = new Subject<OctoFormModel>();
  public $formChange = new Subject<OctoFormModel>();

  constructor(private http: HttpClient) {}

  getFakeForm(): Observable<OctoFormModel> {
    const req$ = this.http.get<OctoFormModel>(FORM_CONFIG_URL).pipe(share());
    req$.subscribe((response: OctoFormModel) => {
      console.log(response);
      const fakeForm: OctoFormModel = response;
      this.$fakeForm.next(fakeForm);
    });
    return req$;
  }

  public InitializeForm(form: OctoFormModel): ResultMessage {
    console.log('Recived Form SERVICE', form);

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

  public setFieldValue(value: any, fieldID: number, sectionID: number) {
    // @ts-ignore
    this.form?.sections
      ?.find((s: OctoSectionModel) => s.id == sectionID)
      .fields.find((f: OctoFieldModel) => f.id == fieldID).value = value;
  }

  public getFielt(fieldID: number, sectionID: number) {
    // @ts-ignore
    return this.form?.sections
      ?.find((s: OctoSectionModel) => s.id == sectionID)
      .fields.find((f: OctoFieldModel) => f.id == fieldID);
  }

  public getSection(sectionID: any) {
    return this.form.sections.find((s) => s.id == sectionID);
  }
}
