import { ApplicationConfigService } from './../services/application-config.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private applicationConfigservice: ApplicationConfigService
  ) {
  }

  intercept(req: any, next: any) {
    let authRequest = req.clone();
    if (this.applicationConfigservice.config) {
      if (this.applicationConfigservice?.config.authenticationSettings.authenticationMode === "Cookie") {
        authRequest = req.clone({
          withCredentials: true
        })
        console.log("TEST", authRequest)
      }
      else {
        authRequest = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.authService.token}`,
          }
        })
      }

    }
    else {
      console.log("Configuration hasn't been loaded yet");
    }
    return next.handle(authRequest)
      .pipe(
        catchError(err => {
          // in case of 401 || 403 http error logout
          if (err instanceof HttpErrorResponse &&  (err.status === 401 || err.status === 403)) {
            this.authService.logout();
          }
          // of error operator transform in observable
          // return of(err.statusText);
          return throwError(err);
        })
      )
  }
}

