import { LoaderService } from '../services/loader.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.totalRequests++;
    let elementRef = this.loaderService.elementRef?.nativeElement;
    if (elementRef !== undefined) {
      elementRef.showSpinner = true;
      elementRef.disabled = true;
    } else {
      this.loaderService.show();
    }

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          if (elementRef !== undefined) {
            elementRef.showSpinner = false;
            elementRef.disabled = false;
          } else {
            this.loaderService.hide();
          }
        }
      })
    );
  }
}
