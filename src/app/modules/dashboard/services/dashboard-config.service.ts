import { AlertService } from './../../../core/services/alert.service';
import { Response } from './../../../shared/models/response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { DashboardConfig } from '../../models/modules.model';
const CONFIG_PATH = 'assets/config/dashboard-config.json';

@Injectable({
  providedIn: 'root'
})
export class DashboardConfigService {
  config: DashboardConfig;
  $config = new Subject<DashboardConfig>();
  $usersList = new Subject<any[]>();
  // #path = 'https://dev.tap-id.tech/tapidconfig/user';
  #path = 'http://localhost:3002/tapidconfig/user';

  constructor(
    private http: HttpClient,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alertService: AlertService
  ) {
  }

  initConfig(): Observable<DashboardConfig> {
    const $req = this.http.get<DashboardConfig>(CONFIG_PATH).pipe(share());
    $req.subscribe((response: DashboardConfig) => {
      this.$config.next(response);
      this.config = response;
      // Manage Routing
      const navigationExist = this.config.routes.some(r => this.router.url.includes(r.path));
      if (!navigationExist) {
        this.router.navigate(['dashboard/' + this.config.defaultRoute]);
      }
    });
    return $req;
  }

  getUsers() {
    const $req = this.http.get<Response<any[]>>(`${this.#path}/get-all`).pipe(share());
    $req.subscribe((res: Response<any[]>) => {
      if (res) {
        console.log(res);
        this.$usersList.next(res.data);
      }
    }, err => {
      this.alertService.present('danger', 'Failed to load users list', err.error.message, 4000);
    });
    return $req;
  }

  lockUser(data: { email: string, lock: boolean }) {
    const $req = this.http.post<Response<{ isLocked: boolean }>>(`${this.#path}/lock`, data).pipe(share());
    $req.subscribe((res: Response<{ isLocked: boolean }>) => {
      if (res) {
        console.log(res);
      }
    }, err => {
      this.alertService.present('danger', 'Failed to lock user', err.error.message, 4000);
    });
    return $req;
  }
}
