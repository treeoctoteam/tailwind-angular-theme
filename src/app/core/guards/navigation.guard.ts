import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  Router,
} from '@angular/router';
import { DashboardConfigService } from 'src/app/modules/dashboard/services/dashboard-config.service';
import { PublicConfigService } from 'src/app/modules/public/services/public.service';
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
    private publicService: PublicConfigService,
    private dashboardService: DashboardConfigService,
    private alertService: AlertService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      console.log(route.url)

      if (this.appConfigService.config.authenticationSettings.enableAuthentication) {
        const activeModule = this.checkActiveModule(state);
        switch (activeModule) {
          case 'public':
            if (!this.publicService.config) {
              console.log("init config public")
              this.publicService.initConfig().subscribe(() => resolve(this.moduleAuthenticate(this.publicService)));
            }
            else {
              resolve(this.moduleAuthenticate(this.publicService));
            }
            break;
          case 'dashboard':
            if (!this.dashboardService.config) {
              this.dashboardService.initConfig().subscribe(() => resolve(this.moduleAuthenticate(this.dashboardService)));
            }
            else {
              resolve(this.moduleAuthenticate(this.dashboardService));
            }
            break;
          case 'configurator':
            resolve(this.isLogged());
            break;
          case 'auth':
            resolve(true);
            break;
          default:
            this.alertService.present('danger', 'Modulo non trovato', 'Il modulo a cui si è tentato di accedere non è disponibile nel sistema.');
            resolve(false);
            break;
        }
      } else {
        if (this.checkActiveModule(state)) {
          resolve(true);
        }
        else {
          this.router.navigateByUrl(this.appConfigService.config.layoutSettings.defaultLayout);
        }
      }

    });

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
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
    this.router.navigateByUrl('auth/login');
  }

  private checkActiveModule(state: RouterStateSnapshot) {
    const layouts: string[] = this.appConfigService.config.layoutSettings.modules;
    let activeLayout = '';
    for (const l of layouts) {
      const res = state.url.includes(l);
      if (res) {
        activeLayout = l.replace('/', '');
        break;
      }
    }
    return activeLayout;
  }

}
