import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  Router,
} from '@angular/router';
import { DashboardConfigService } from 'src/app/modules/dashboard/services/dashboard-config.service';
import { LandingpageConfigService } from 'src/app/modules/landing-page/services/landingpage-config.service';
import { AlertService } from '../services/alert.service';
import { ApplicationConfigService } from '../services/application-config.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NavigationGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private appConfigService: ApplicationConfigService,
    private authService: AuthService,
    private landingService: LandingpageConfigService,
    private dashboardService: DashboardConfigService,
    private alertService: AlertService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): boolean {
    if (this.appConfigService.config.authenticationSettings.enableAuthentication) {
      let activeModule = this.checkActiveModule(state);
      switch (activeModule) {
        case "landingpage":
          if (!this.landingService.config) {
            this.landingService.initConfig().subscribe(() => {
              return this.moduleAuthenticate(this.landingService);
            })
          }
          else {
            return this.moduleAuthenticate(this.landingService);
          }
          break;
        case "dashboard":
          if (!this.dashboardService.config) {
            this.dashboardService.initConfig().subscribe(() => {
              return this.moduleAuthenticate(this.dashboardService);
            })
          }
          else {
            return this.moduleAuthenticate(this.dashboardService);
          }
          break;
      }
    } else {
      if (this.checkActiveModule(state)) {
        return true;
      }
      else {
        this.router.navigateByUrl(this.appConfigService.config.layoutSettings.defaultLayout)
      }
    }
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let activeLayout = this.checkActiveModule(state);
      let activeRoute = this.checkActivePage(activeLayout, state);
      if (!activeRoute?.authenticate) {
        resolve(true)
      }
      else if (this.authService.user) {
        resolve(true)
      } else {
        this.redirectLogin();
        resolve(false)
      }
    })
  }

  private moduleAuthenticate(service: any) {
    if (!service.config.authenticate) {
      return true;
    }
    else {
      return this.isLogged();
    }
  }
  private isLogged() {
    if (this.authService.user) {
      return true;
    }
    else {
      this.redirectLogin();
      return false;
    }
  }
  private redirectLogin() {
    this.alertService.present('danger', 'Auth error', 'Devi prima effettuare il login');
    this.router.navigateByUrl("auth/login");
  }

  private checkActiveModule(state: RouterStateSnapshot) {
    const layouts: string[] = this.appConfigService.config.layoutSettings.layouts;
    let activeLayout = "";
    for (let l of layouts) {
      const res = state.url.includes(l);
      if (res) {
        activeLayout = l.replace("/", "");
        break;
      }
    };
    return activeLayout;
  }
  private checkActivePage(activeLayout: string, state: RouterStateSnapshot) {
    let activeRoute;
    switch (activeLayout) {
      case "landingpage":
        for (let r of this.landingService.config.routes) {
          const res = state.url.includes(r.path);
          if (res) {
            activeRoute = r;
            break;
          }
        };
        break;
      case "dashboard":
        for (let r of this.dashboardService.config.routes) {
          const res = state.url.includes(r.path);
          if (res) {
            activeRoute = r;
            break;
          }
        };
        break;
    }
    return activeRoute;
  }
}
