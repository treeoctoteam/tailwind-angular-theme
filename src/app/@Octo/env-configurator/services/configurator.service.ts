import { share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { ApplicationConfig } from './../../../shared/models/application-config.model';
import { DashboardConfig } from './../../../modules/models/modules.model';
import { Injectable } from '@angular/core';
const DASHBOARD_CONFIG_PATH = 'assets/config/dashboard-config.json';
const APP_CONFIG_PATH = 'assets/config/application-config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  config: DashboardConfig | ApplicationConfig;
  $config = new Subject<DashboardConfig | ApplicationConfig>();

  constructor(private http: HttpClient) {
  }

  getDashboardConfig(): Observable<DashboardConfig> {
    const $req = this.http.get<DashboardConfig>(DASHBOARD_CONFIG_PATH).pipe(share());
    $req.subscribe((response: DashboardConfig) => {
      this.$config.next(response);
      this.config = response;
    });
    return $req;
  }

  getApplicationConfig(): Observable<ApplicationConfig> {
    const $req = this.http.get<ApplicationConfig>(APP_CONFIG_PATH).pipe(share());
    $req.subscribe((response: ApplicationConfig) => {
      this.$config.next(response);
      this.config = response;
    });
    return $req;
  }


}
