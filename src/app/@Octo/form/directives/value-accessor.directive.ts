import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Injector,
  OnInit,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  NgControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { OctoFieldType } from '../models/octo-field.model';

@Directive({
  selector: '[octoValueAccessor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueAccessorDirective),
      multi: true
    },
  ],
})
export class ValueAccessorDirective implements OnInit, ControlValueAccessor {
  // @Input('octoValueAccessor') errors: { [k: string]: string} = {};

  private ngControl: NgControl;

  private onChange = (value: any): void => {};
  private onTouched = (): void => {};

  constructor(@Self() private injector: Injector,
              private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  @HostListener('change', ['$event'])
  handleInputEvent(event: CustomEvent) {
    if (event instanceof CustomEvent) {
      let elementValue: unknown;
      const elementType = (event.target as any).type as OctoFieldType;
      if (elementType === 'text' || elementType === 'number' || elementType === 'autocomplete' || elementType === 'password') {
        elementValue = (event.target as HTMLInputElement).value;
      }
      if ((event as any)?.detail?.target?.localName === 'select') {
        elementValue = (event as any).detail.target.value;
      }
      if ((event as any)?.detail?.target?.type === 'checkbox') {
        elementValue = (event.target as any).checked;
      }
      if ((event as any)?.target?.localName === 'to-toggle') {
        elementValue = (event as any).detail;
      }
      if ((event as any)?.detail?.target?.type === 'textarea') {
        elementValue = (event as any).detail.target.value;
      }
      this.writeValue(elementValue);
    }
  }

  setErrors(element: any) {
    const ngErrors = { ...this.ngControl.control?.errors };
    const matchingErrors: string[] = [];

    this.onChange(element.value);
    this.onTouched();

    if (ngErrors) {
      const ngErrorKeys: string[] = [...Object.keys(ngErrors)];
      if (ngErrorKeys.length > 0) {
        ngErrorKeys.forEach((e) => {
          // matchingErrors.push(this.errors[e]);
        });
        // console.log(this.errors)
        element.errorMessage = [...matchingErrors];
      } else {
        element.errorMessage = [];
      }
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
