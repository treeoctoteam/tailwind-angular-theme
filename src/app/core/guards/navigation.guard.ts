import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';
import { pluck } from 'rxjs/operators';
import { ApplicationConfigService } from '../services/application-config.service';

const getConfigPath = (pathUrl: string) => {
  return pathUrl.split('/')[1];
}

@Injectable({
  providedIn: 'root',
})
export class NavigationGuard implements CanActivate, CanActivateChild {

  constructor(private appConfigService: ApplicationConfigService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const layouts: string[] = this.appConfigService.appConfig.layouts;
    for (let layout of layouts) {
      if (state.url.includes(layout)) {
        return true;
      }
    }
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.appConfigService.getActiveLayoutConfig(getConfigPath(state.url))
        .pipe(pluck('routes'))
        .subscribe((values) => {
          const pages: string[] = values as string[];
          for (let page of pages) {
            if (state.url.includes(page)) {
              resolve(true);
            }
          }
          console.log('navigation blocked', state.url);
          resolve(false);
        });
    });
  }
}
