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
    // const auth = this.injector.get(AuthService);
    let authRequest = req.clone();
    if (this.applicationConfigservice.config){
      if (this.applicationConfigservice?.config.authenticationMode === "Cookie"){
        authRequest = req.clone({
          withCredentials: true
        })
        console.log("TEST", authRequest)
      }
      else {
        authRequest = req.clone({
          setHeaders: {
            // User: this.authService.user,
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
          // in case of 401 http error && message of check authenticated
          if (err instanceof HttpErrorResponse && err.status === 401 && err.statusText === "Token not verified") {
            return this.authService.refreshToken();
          }
          // of error operator transform in observable
          // return of(err.statusText);
          return throwError(err);
        })
      )
  }
}

