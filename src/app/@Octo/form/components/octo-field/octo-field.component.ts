import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { OctoFormService } from '../../octo-form.service';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { OctoFieldModel } from '../../models/octo-field.model';
import { OctoFieldOptionModel } from '../../models/octo-field-option.model';

@Component({
  selector: 'octo-field',
  templateUrl: './octo-field.component.html',
  styleUrls: ['./octo-field.component.scss'],
})
export class OctoFieldComponent implements OnInit, OnDestroy {

  private $onDestroing: Subject<void> = new Subject<void>();
  formFieldControl: FormControl;
  errorMessage: string;
  filteredOptions: Observable<OctoFieldOptionModel[]>;
  @Input() formField: OctoFieldModel;
  constructor(public _formService: OctoFormService) {}

  ngOnInit(): void {
    this.formFieldControl = new FormControl('', Validators.compose(this.setValidators(this.formField)));
    this.initFormControlState(this.formField, this.formFieldControl);
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

    this.formFieldControl.statusChanges
      .pipe(takeUntil(this.$onDestroing))
      .subscribe(status => this.errorMessage = status === 'INVALID' ? this.getErrorMessage() : '');

    this.filteredOptions = this.formFieldControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  ngOnDestroy(): void {
    this.$onDestroing.next();
  }

  private initFormControlState(field: OctoFieldModel, formControl: FormControl): void {
    if (field?.value) {
      formControl.setValue(field.value);
    }
    if (field?.disabled) {
      formControl.disable();
    }
  }

  private setValidators(field: OctoFieldModel): ValidatorFn[] {
    let validators: ValidatorFn[] = [];
    if (field) {
      if (field.validation?.required) {
        validators.push(Validators.required);
      }
      if ((field.type === 'text' || field.type === 'number') && field.validation?.max) {
        validators.push(Validators.max(field.validation?.max));
      }
      if ((field.type === 'text' || field.type === 'number') && field.validation?.min) {
        validators.push(Validators.min(field.validation?.min));
      }
      if (field.type === 'text' && field.validation?.maxLength) {
        validators.push(Validators.maxLength(field.validation?.maxLength));
      }
      if (field.type === 'text' && field.validation?.minLength) {
        validators.push(Validators.minLength(field.validation?.minLength));
      }
      if (field.validation?.regEx) {
        validators.push(Validators.pattern(field.validation?.regEx));
      }
    }
    return validators;
  }


  getErrorMessage(): string {
    if (this.formFieldControl.touched && this.formFieldControl.dirty && this.formFieldControl?.errors) {
      if (this.formFieldControl.errors.required) {
        return 'You must enter a value';
      } else if (this.formFieldControl.errors.maxlength) {
        return 'Max Length error';
      } else if (this.formFieldControl.errors.minlength) {
        return 'Min Length error';
      } else if (this.formFieldControl.errors.min) {
        return 'Min error';
      } else if (this.formFieldControl.errors.max) {
        return 'Max error';
      } else if (this.formFieldControl.errors.pattern) {
        return 'Regex error'
      }
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
  // minDate(date: string): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (control.value == null) {
  //       return null;
  //     }
  //     const controlDate = moment(control.value);
  //     if (!control.valid) {
  //       return null;
  //     }
  //     const validationDate = new Date(date);
  //     return controlDate.isAfter(validationDate)
  //       ? null
  //       : {
  //           minDate: true,
  //         };
  //   };
  // }

  // maxDate(date: string): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (control.value == null) {
  //       return null;
  //     }
  //     const controlDate = moment(control.value);
  //     if (!control.valid) {
  //       return null;
  //     }
  //     const validationDate = new Date(date);
  //     return controlDate.isBefore(validationDate)
  //       ? null
  //       : {
  //           maxDate: true,
  //         };
  //   };
  // }
}

