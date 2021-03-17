import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  $isLoading: Subject<boolean> = new Subject<boolean>();
  isLoaderElement = false;

  show() {
    if (!this.isLoaderElement) {
      this.$isLoading.next(true);
    }
  }

  hide() {
    if (!this.isLoaderElement) {
      this.$isLoading.next(false);
    }
  }
}
