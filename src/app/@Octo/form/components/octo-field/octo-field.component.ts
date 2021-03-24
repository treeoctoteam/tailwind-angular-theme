import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import moment from 'moment';
import { OctoFieldOptionModel } from '../../models/core/octo-field-option.model';
import { OctoFieldModel } from '../../models/core/octo-field.model';
import { OctoFormService } from '../../octo-form.service';


@Component({
  selector: 'octo-field',
  templateUrl: './octo-field.component.html',
  styleUrls: ['./octo-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OctoFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => OctoFieldComponent),
      multi: true,
    },
  ],
})
export class OctoFieldComponent implements OnInit, ControlValueAccessor, Validators {

  octoFieldControl = new FormControl('');

  @Input() octoField: OctoFieldModel;

  public onTouched: () => void = () => {};

  constructor(public _formService: OctoFormService) {}

  ngOnInit(): void {
    // this.setFieldValidator();
    // this.octoFieldControl.valueChanges.subscribe((value) => {
    //   if (value !== this.octoFieldControl.value) {
    //     this.octoFieldValueChange.emit(value);
    //   }
    // });
    // this.filteredOptions = this.octoField.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value))
    // );
  }

  writeValue(val: any): void {
    val && this.octoFieldControl.setValue(val, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.octoFieldControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled
      ? this.octoFieldControl.disable()
      : this.octoFieldControl.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.octoFieldControl.valid ? null : {
      invalidForm: {
        valid: false,
        message: 'basicInfoForm fields are invalid',
      },
    };
  }

  //   setFieldValidator(): void {
  //     if (this.octoField.value) {
  //       this.octoFieldControl.setValue(this.octoField.value);
  //     }
  //     let validators: ValidatorFn[] = [];
  //     if (this.octoField.validation?.required) {
  //     validators.push(Validators.required);
  //   }
  //   if (this.octoField.type === 'number' && this.octoField.validation?.max) {
  //     validators.push(Validators.max(this.octoField.validation?.max));
  //   }
  //   if (this.octoField.type === 'number' && this.octoField.validation?.min) {
  //     validators.push(Validators.min(this.octoField.validation?.min));
  //   }
  //   if (this.octoField.type === 'text' && this.octoField.validation?.max) {
  //     validators.push(Validators.maxLength(this.octoField.validation?.max));
  //   }
  //   if (this.octoField.type === 'text' && this.octoField.validation?.min) {
  //     validators.push(Validators.minLength(this.octoField.validation?.min));
  //   }
  //   if (this.octoField.validation?.regEx) {
  //     validators.push(Validators.pattern(this.octoField.validation?.regEx));
  //   }
  //   // if (this.field.type === 'datePicker' && this.field.validation?.minDate) {
  //     //   validators.push(this.minDate(this.field.validation?.minDate));
  //     // }
  //     // if (this.field.type === 'datePicker' && this.field.validation?.maxDate) {
  //       //   validators.push(this.maxDate(this.field.validation?.maxDate));
  //       // }
  //       this.octoFieldControl.setValidators(validators);
  //       this.octoFieldControl.updateValueAndValidity();
  //     }

  //     minDate(date: string): ValidatorFn {
  //       return (control: AbstractControl): ValidationErrors | null => {
  //         if (control.value === null) {
  //           return null;
  //         }
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

  // getErrorMessage(): string {
  //   if (this.octoFieldControl.touched) {
  //     if (this.octoFieldControl.hasError('required')) {
  //       return 'You must enter a value';
  //     }
  //     if (this.octoFieldControl.hasError('min')) {
  //       return 'Min error';
  //     }
  //     if (this.octoFieldControl.hasError('minDate')) {
  //       return 'Min date error';
  //     }
  //     if (this.octoFieldControl.hasError('maxDate')) {
  //       return 'Max date error';
  //     }
  //     return this.octoFieldControl.hasError('max') ? 'Max error' : '';
  //   }
  //   return '';
  // }

  // private _filter(value: string): OctoFieldOptionModel[] {
  //   const filterValue = value.toLowerCase();
  //   if (this.octoField.options) {
  //     return this.octoField.options.filter(
  //       (option) => option.label.toLowerCase().indexOf(filterValue) >= 0
  //     );
  //   }
  //   return [];
  // }
}
