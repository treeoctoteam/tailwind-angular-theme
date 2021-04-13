import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { PublicConfig } from '../../models/modules.model';
const CONFIG_PATH = 'assets/config/public-config.json';

@Injectable({
  providedIn: 'root'
})
export class PublicConfigService {
  config: PublicConfig;
  $config = new Subject<PublicConfig>();

  constructor(private http: HttpClient, private router: Router) {
  }

  initConfig(): Observable<PublicConfig> {
    const $req = this.http.get<PublicConfig>(CONFIG_PATH).pipe(share());
    $req.subscribe((response: PublicConfig) => {
      this.$config.next(response);
      this.config = response;
      // Manage Routing
      const navigationExist = this.config.routes.some(r => this.router.url.includes(r.path));
      if (!navigationExist) {
        this.router.navigate(['public/' + this.config.defaultRoute]);
      }
    });
    return $req;
  }
}
