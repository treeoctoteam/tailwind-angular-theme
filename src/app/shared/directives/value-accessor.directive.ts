import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Directive({
  selector: '[octoValueAccessor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueAccessorDirective),
      multi: true
    }
  ]
})
export class ValueAccessorDirective implements ControlValueAccessor {

  private onChange = (value: any): void => {};
  private onTouched = (): void => {};

  constructor(private elementRef: ElementRef) {}

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
    this.elementRef.nativeElement.disabled = isDisabled;
  }
}
