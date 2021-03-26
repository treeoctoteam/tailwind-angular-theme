import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { OctoFormService } from '../../octo-form.service';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { OctoFieldModel } from '../../models/octo-field.model';
import { OctoFieldOptionModel } from '../../models/octo-field-option.model';

@Component({
  selector: 'octo-field',
  templateUrl: './octo-field.component.html',
  styleUrls: ['./octo-field.component.scss'],
})
export class OctoFieldComponent implements OnInit, OnDestroy {

  formFieldControl = new FormControl('', [Validators.maxLength(4)]);
  private $onDestroing: Subject<void> = new Subject<void>();
  filteredOptions: Observable<OctoFieldOptionModel[]>;
  @Input() field: OctoFieldModel;
  @Input() required: boolean;
  constructor(public _formService: OctoFormService) {}

  ngOnInit(): void {
    this.initField();
    this.formFieldControl.valueChanges
      .pipe(takeUntil(this.$onDestroing), distinctUntilChanged())
      .subscribe((value) => {
        this.field.value = value;
        this._formService.setFieldValue(
          value,
          this.field.id,
          this.field.sectionId
        );
      });
    this.filteredOptions = this.formFieldControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngOnDestroy(): void {
    this.$onDestroing.next();
  }

  initField(): void {
    let validators: ValidatorFn[] = [];
    if (this.field.value) {
      this.formFieldControl.setValue(this.field.value);
    }
    if (this.field.validation?.required) {
      validators.push(Validators.required);
    }
    if (this.field.type === 'number' && this.field.validation?.max) {
      validators.push(Validators.max(this.field.validation?.max));
    }
    if (this.field.type === 'number' && this.field.validation?.min) {
      validators.push(Validators.min(this.field.validation?.min));
    }
    if (this.field.type === 'text' && this.field.validation?.max) {
      validators.push(Validators.maxLength(this.field.validation?.max));
    }
    if (this.field.type === 'text' && this.field.validation?.min) {
      validators.push(Validators.minLength(this.field.validation?.min));
    }
    if (this.field.validation?.regEx) {
      validators.push(Validators.pattern(this.field.validation?.regEx));
    }
    // if (this.field.type === 'datePicker' && this.field.validation?.minDate) {
    //   validators.push(this.minDate(this.field.validation?.minDate));
    // }
    // if (this.field.type === 'datePicker' && this.field.validation?.maxDate) {
    //   validators.push(this.maxDate(this.field.validation?.maxDate));
    // }
    this.formFieldControl.setValidators(validators);
    this.formFieldControl.updateValueAndValidity();
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
      return controlDate.isAfter(validationDate)
        ? null
        : {
            minDate: true,
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
      return controlDate.isBefore(validationDate)
        ? null
        : {
            maxDate: true,
          };
    };
  }

  getErrorMessage(): string {
    if (this.formFieldControl.touched) {
      if (this.formFieldControl.hasError('required')) {
        return 'You must enter a value';
      }
      if (this.formFieldControl.hasError('min')) {
        return 'Min error';
      }
      if (this.formFieldControl.hasError('minDate')) {
        return 'Min date error';
      }
      if (this.formFieldControl.hasError('maxDate')) {
        return 'Max date error';
      }
      return this.formFieldControl.hasError('max') ? 'Max error' : '';
    }
    return '';
  }

  private _filter(value: string): OctoFieldOptionModel[] {
    const filterValue = value.toLowerCase();
    if (this.field.options) {
      return this.field.options.filter(
        (option) => option.label.toLowerCase().indexOf(filterValue) >= 0
      );
    }
    return [];
  }
}

