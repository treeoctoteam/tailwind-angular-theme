import { Router } from '@angular/router';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private authService: AuthService,
    private router: Router) { }

  intercept(req: any, next: any) {
    const auth = this.injector.get(AuthService);
    const authRequest = req.clone({
      withCredentials: true
      // headers: req.headers.set('Authorization', 'token ' + auth.token)
    })
    console.log("AUTH", authRequest)
    return next.handle(authRequest)
    // .pipe(
    //   catchError(err => {
    //     // in case of 401 http error
    //     if (err instanceof HttpErrorResponse && err.status === 401) {
    //       const accessToken = localStorage.getItem('accessToken');
    //       const refreshToken = localStorage.getItem('refreshToken');
    //       if (refreshToken && accessToken) {
    //         return this.authService.refreshToken().pipe(
    //           switchMap((res) => {
    //             // this.refreshingInProgress = false;
    //             // this.accessTokenSubject.next(res.accessToken);
    //             // // repeat failed request with new token
    //             // return next.handle(this.addAuthorizationHeader(request, res.accessToken));

    //             const authRequest = req.clone({
    //               withCredentials: true
    //             })
    //             return next.handle(authRequest)
    //           })
    //         )
    //       }
    //     }
    //   })
    // )
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


