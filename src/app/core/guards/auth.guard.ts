import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  Router,
} from '@angular/router';
import { ApplicationConfigService } from '../services/application-config.service';
import { AuthService } from '../services/auth.service';

const getConfigPath = (pathUrl: string) => pathUrl.split('/')[1];

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private appConfigService: ApplicationConfigService,
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const role = route.data.role;
    if (!role) {
      if (this.authService?.user) {
        return true;
      }
    }
    else if (this.authService?.user && this.authService.user?.role == role) {
      return true;
    }
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
  }

  checkAuth(url: string): boolean {
    console.log('Check user logged');
    if (this.authService.isLogged) {
      return true;
    }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    this.router.navigate(['auth/login']);
    return false;
  }
}
