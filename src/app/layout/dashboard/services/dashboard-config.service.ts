import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { DashboardConfig } from '../../models/layout.model';
const CONFIG_PATH = 'assets/config/dashboard-config.json';

@Injectable({
  providedIn: "root"
})
export class DashboardConfigService {
  config: DashboardConfig;
  $config = new Subject<DashboardConfig>();

  constructor(private http: HttpClient, private router: Router, private activeRoute: ActivatedRoute) {
  }

  initConfig(): Observable<DashboardConfig> {
    const $req = this.http.get<DashboardConfig>(CONFIG_PATH).pipe(share());
    $req.subscribe((response: DashboardConfig) => {
      this.$config.next(response);
      this.config = response;
      // Manage Routing
      let navigationExist = this.config.routes.some(r => this.router.url.includes(r.path));
      if (!navigationExist) {
        this.router.navigate(['dashboard/' + this.config.defaultRoute]);
      }
    });
    return $req;
  }

}
