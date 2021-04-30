import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardConfigService } from '../services/dashboard-config.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardDefaultGuard implements CanActivateChild {
  constructor(private router: Router, private dashboardConfigService: DashboardConfigService) { }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.dashboardConfigService.config.defaultRoute) {
      return true;
    }
    this.router.navigate([this.dashboardConfigService.config.defaultRoute]);
  }

}
