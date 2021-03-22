import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';
import { pluck } from 'rxjs/operators';
import { ApplicationConfigService } from '../services/application-config.service';
import { AuthService } from '../services/auth.service';

const getConfigPath = (pathUrl: string) => {
  return pathUrl.split('/')[1];
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private appConfigService: ApplicationConfigService, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService?.user && this.authService.user?.role == "admin") {
      return true;
    }
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
  }
}
