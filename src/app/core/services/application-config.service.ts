import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { ApplicationConfig } from 'src/app/shared/models/application-config.model';

const APP_CONFIG_PATH = 'assets/config/application-config.json';

@Injectable({
  providedIn: 'root'
})
export class ApplicationConfigService {

  private configuration: ApplicationConfig;
  $config = new Subject<ApplicationConfig>();

  constructor(private http: HttpClient, private router: Router) { 
    
  }

  initAppConfig(): Observable<ApplicationConfig> {
    const $req = this.http.get<ApplicationConfig>(APP_CONFIG_PATH).pipe(share());
    $req.subscribe((response: ApplicationConfig) => {
      this.configuration = response;
      this.$config.next(response);
      const navigationExist = this.configuration.layoutSettings.modules.some(module => this.router.url.includes(module));
      if (!navigationExist) {
        this.router.navigateByUrl(this.configuration.layoutSettings.defaultLayout);
      }
    });
    return $req;
  }

  public get config(): ApplicationConfig {
    return this.configuration;
  }

}
