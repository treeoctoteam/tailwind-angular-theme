import { HttpHeaders } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {


  $isLoading: Subject<boolean> = new Subject<boolean>();
  private elementRef: ElementRef<any> | undefined;

  show() {
    this.$isLoading.next(true);
  }

  hide() {
    this.$isLoading.next(false);
  }

  createHiddenSpinnerHeader(): { headers?: HttpHeaders } {
    const header = new HttpHeaders()
      .set('octo-hidden-spinner', 'true')
    return {
      headers: header
    };
  }

  getElementRef(): ElementRef<any> | undefined {
    return this.elementRef;
  }
  showSpinnerButton(elementRef: ElementRef<any> | undefined): void {
    this.elementRef = elementRef;
  }
  hideSpinnerButton(): void {
    this.elementRef = undefined;
  }
}
