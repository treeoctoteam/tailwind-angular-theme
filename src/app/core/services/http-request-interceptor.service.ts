import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: any, next: any) {
    const auth = this.injector.get(AuthService);
    const authRequest = req.clone({
      withCredentials: true
      // headers: req.headers.set('Authorization', 'token ' + auth.token)
    })
    console.log("AUTH", authRequest)
    return next.handle(authRequest);
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


