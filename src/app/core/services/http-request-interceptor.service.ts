import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: any, next: any) {
    const auth = this.injector.get(AuthService);
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'token ' + auth.token)
    })
    return next.handle(authRequest);
  }
}
