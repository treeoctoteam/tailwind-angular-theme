import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { LandingPageConfig } from '../../models/layout.model';
const CONFIG_PATH = 'assets/config/landingpage-config.json';

@Injectable({
  providedIn: "root"
})
export class LandingpageConfigService {

  config: LandingPageConfig;
  $config = new Subject<LandingPageConfig>();

  constructor(private http: HttpClient, private router: Router, private activeRoute: ActivatedRoute) {
  }

  initConfig(): Observable<LandingPageConfig> {
    const $req = this.http.get<LandingPageConfig>(CONFIG_PATH).pipe(share());
    $req.subscribe((response: LandingPageConfig) => {
      this.$config.next(response);
      this.config = response;
      // Manage Routing
      let navigationExist = this.config.routes.some(r => this.router.url.includes(r.path));
      if (!navigationExist) {
        this.router.navigate(['landingpage/' + this.config.defaultRoute]);
      }
    });
    return $req;
  }
}
