import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
     import { PublicConfigService } from '../services/public.service';

@Injectable({
  providedIn: 'root'
})
export class PublicDefaultGuard implements CanActivateChild {
  constructor(private router: Router, private publicConfigService: PublicConfigService) { }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    console.log("Guard PublicDefaultGuard");

    if (!this.publicConfigService.config.defaultRoute) {
      return true;
    }

    this.router.navigateByUrl(this.publicConfigService.config.defaultRoute);
  }
}
