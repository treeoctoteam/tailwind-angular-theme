import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { OctoFieldModel } from '../models/octo-field.model';

@Directive({
  selector: '[octoValueAccessor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueAccessorDirective),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValueAccessorDirective),
      multi: true
    }
  ]
})
export class ValueAccessorDirective implements OnInit, ControlValueAccessor, Validators {
  field: OctoFieldModel;
  @Input('formField')
  set formField(field: OctoFieldModel) {
    if (field) {
      this.field = field;
    }
  }

  isDisabled: boolean;
  private onChange = (value: any): void => {};
  private onTouched = (): void => {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  @HostListener('toElementChange', ['$event'])
  handleInputEvent(event: any) {
    this.writeValue(event.detail.value);
  }

  writeValue(value: any): void {
    this.elementRef.nativeElement.value = value;
    this.onChange(value);
    this.onTouched();
  }

  registerOnChange(fn: (value: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.isErrors(control.value, this.formField) ? { invalid: true } : null;
  }

  private isErrors(value: string, formField: OctoFieldModel): boolean {
    let isValid = true;
    if (formField?.validation?.maxLength && value.length > formField.validation?.maxLength) {
      isValid = false;
    }
    if (formField?.validation?.minLength && value.length < formField.validation?.minLength) {
      isValid = false;
    }
    if (formField?.validation?.required && value.length === 0 ) {
      isValid = false;
    }
    return isValid;
  }
}
