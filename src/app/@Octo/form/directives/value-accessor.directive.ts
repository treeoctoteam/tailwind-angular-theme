import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { OctoFieldModel } from '../models/octo-field.model';

@Directive({
  selector: '[octoValueAccessor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueAccessorDirective),
      multi: true,
    }
  ]
})
export class ValueAccessorDirective implements OnInit, ControlValueAccessor {
  elementControl: FormControl
  @Input('formField') formField: OctoFieldModel;
  @Input('formControl')
  set fieldContol(control: FormControl) {
    if (control) {
      this.elementControl = control;
    }
  }

  private onChange = (value: any): void => {};
  private onTouched = (): void => {};

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.setValidators(this.formField, this.elementControl)
  }

  @HostListener('toElementChange', ['$event'])
  handleInputEvent(event: any) {
    this.writeValue(event.detail.value);
    console.log(this.elementControl);
  }

  private setValidators(field: OctoFieldModel, control: FormControl) {
    if (field) {
      console.log(field)
      let validators: ValidatorFn[] = [];
      if (field.disabled) {
        control.disable();
        this.elementRef.nativeElement.disabled = true;
      }
      if ((field.type === 'text' || field.type === 'number') && field.validation?.max) {
        validators.push(Validators.max(field.validation?.max));
        this.elementRef.nativeElement.max = field.validation.max;
      }
      if ((field.type === 'text' || field.type === 'number') && field.validation?.min) {
        validators.push(Validators.min(field.validation?.min));
        this.elementRef.nativeElement.min = field.validation.min;
      }
      if (field.type === 'text' && field.validation?.maxLength) {
        validators.push(Validators.maxLength(field.validation?.maxLength));
        this.elementRef.nativeElement.maxLength = field.validation.maxLength;
      }
      if (field.type === 'text' && field.validation?.minLength) {
        validators.push(Validators.minLength(field.validation?.minLength));
        this.elementRef.nativeElement.minLength = field.validation.minLength;
      }
      if (field.validation?.regEx) {
        validators.push(Validators.pattern(field.validation?.regEx));
        this.elementRef.nativeElement.regEx = field.validation.regEx;
      }
      console.log(validators)
      control.setValidators(validators)
    }
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
}
