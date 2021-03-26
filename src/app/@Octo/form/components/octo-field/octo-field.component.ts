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

  formFieldControl = new FormControl('');
  private $onDestroing: Subject<void> = new Subject<void>();
  filteredOptions: Observable<OctoFieldOptionModel[]>;
  @Input() formField: OctoFieldModel;
  @Input() required: boolean;
  constructor(public _formService: OctoFormService) {}

  ngOnInit(): void {
    this.formFieldControl.valueChanges
      .pipe(takeUntil(this.$onDestroing), distinctUntilChanged())
      .subscribe((value) => {
        this.formField.value = value;
        this._formService.setFieldValue(
          value,
          this.formField.id,
          this.formField.sectionId
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
    if (this.formFieldControl.touched && this.formFieldControl.dirty) {
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
    if (this.formField.options) {
      return this.formField.options.filter(
        (option) => option.label.toLowerCase().indexOf(filterValue) >= 0
      );
    }
    return [];
  }
}

