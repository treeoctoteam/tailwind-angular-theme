import { ElementRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  $isLoading: Subject<boolean> = new Subject<boolean>();
  elementRef: ElementRef<any> | undefined;

  show() {
    this.$isLoading.next(true);
  }

  hide() {
    this.$isLoading.next(false);
  }
}
