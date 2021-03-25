import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { ApplicationConfig } from 'src/app/shared/models/application-config.model';

const APP_CONFIG_PATH = 'assets/config/application-config.json';

@Injectable({
  providedIn: 'root'
})
export class ApplicationConfigService {

  config: ApplicationConfig;
  $config = new Subject<ApplicationConfig>();

  constructor(private http: HttpClient, private router: Router) { }

  initAppConfig(): Observable<ApplicationConfig> {
    const $req = this.http.get<ApplicationConfig>(APP_CONFIG_PATH).pipe(share());
    $req.subscribe((response: ApplicationConfig) => {
      this.$config.next(response);
      this.config = response;
      let navigationExist = this.config.modules.some(l => this.router.url.includes(l));
      if (!navigationExist) {
        this.router.navigateByUrl(this.config.defaultLayout);
      }
    });
    return $req;
  }


}
