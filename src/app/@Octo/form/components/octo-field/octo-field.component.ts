import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { OctoFieldModel } from '../../models/core/octo-field.model';
import { FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { OctoFormService } from '../../octo-form.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { OctoFieldOptionModel } from '../../models/core/octo-field-option.model';
import * as moment from 'moment';

@Component({
  selector: 'octo-field',
  templateUrl: './octo-field.component.html',
  styleUrls: ['./octo-field.component.scss']
})
export class OctoFieldComponent implements OnInit, AfterViewInit {

  value: any;
  input = new FormControl('');
  filteredOptions: Observable<OctoFieldOptionModel[]>;
  @Input() field: OctoFieldModel;
  @Input() required: boolean;

  constructor(public _formService: OctoFormService) {}


  ngOnInit(): void {
    this.initField();
    this.filteredOptions = this.input.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngAfterViewInit(): void {
    this.input.valueChanges.subscribe(res => {
      if (res !== this.field.value) {
        this._formService.setFieldValue(res, this.field.id, this.field.sectionId);
      }
    })
  }

  initField(): void {
    console.log("FIELD", this.field);
    if (this.field.value) {
      this.input.setValue(this.field.value);

    }
    let validators: ValidatorFn[] = []
    if (this.field.validation.required) {
      validators.push(Validators.required);
    }
    if (this.field.type === 'number' && this.field.validation.max) {
      validators.push(Validators.max(this.field.validation.max));
    }
    if (this.field.type === 'number' && this.field.validation.min) {
      validators.push(Validators.min(this.field.validation.min));
    }
    if (this.field.type === 'text' && this.field.validation.max) {
      validators.push(Validators.maxLength(this.field.validation.max));
    }
    if (this.field.type === 'text' && this.field.validation.min) {
      validators.push(Validators.minLength(this.field.validation.min));
    }
    if (this.field.validation.regEx) {
      validators.push(Validators.pattern(this.field.validation.regEx));
    }
    // if (this.field.type === 'datePicker' && this.field.validation.minDate) {
    //   validators.push(this.minDate(this.field.validation.minDate));
    // }
    // if (this.field.type === 'datePicker' && this.field.validation.maxDate) {
    //   validators.push(this.maxDate(this.field.validation.maxDate));
    // }
    this.input.setValidators(validators);
    this.input.updateValueAndValidity();
  }

  minDate(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }
      const controlDate = moment(control.value);
      if (!control.valid) {
        return null;
      }
      const validationDate = new Date(date);
      return controlDate.isAfter(validationDate) ? null : {
        'minDate': true
      };
    };
  }

  maxDate(date: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }
      const controlDate = moment(control.value);
      if (!control.valid) {
        return null;
      }
      const validationDate = new Date(date);
      return controlDate.isBefore(validationDate) ? null : {
        'maxDate': true
      };
    };
  }

  getErrorMessage(): string {
    if (this.input.touched) {
      if (this.input.hasError('required')) {
        return 'You must enter a value';
      }
      if (this.input.hasError('min')) {
        return 'Min error';
      }
      if (this.input.hasError('minDate')) {
        return 'Min date error';
      }
      if (this.input.hasError('maxDate')) {
        return 'Max date error';
      }
      return this.input.hasError('max') ? 'Max error' : '';
    }
    return '';
  }

  private _filter(value: string): OctoFieldOptionModel[] {
    const filterValue = value.toLowerCase();
    return this.field.options.filter(option => option.label.toLowerCase().indexOf(filterValue) >= 0);
  }

}

