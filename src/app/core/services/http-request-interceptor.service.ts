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
          else {
            console.log("ELSE")
            return this.router.navigateByUrl('/landingpage/login');
            // of error operator transform in observable
            // return of(err.statusText);
            // return throwError(err);
          }
        })
      )
  }
}

