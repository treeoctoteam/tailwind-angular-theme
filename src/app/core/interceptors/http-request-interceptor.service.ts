import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: any, next: any) {
    // const auth = this.injector.get(AuthService);
    const authRequest = req.clone({
      withCredentials: true
      // headers: req.headers.set('Authorization', 'token ' + auth.token)
    })
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




// with token jwt set oon local storage
// intercept(req: any, next: any) {
//   const auth = this.injector.get(AuthService);
//   const authRequest = req.clone({
//     headers: req.headers.set('Authorization', 'token ' + auth.token)
//   })
//   return next.handle(authRequest);
// }


