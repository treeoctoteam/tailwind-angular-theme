import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { ApplicationConfig } from 'src/app/models/application-config.model';

const APP_CONFIG_PATH = 'assets/config/application-config.json';

@Injectable({
  providedIn: 'root'
})
export class ApplicationConfigService {

  appConfig: ApplicationConfig;
  activeLayoutConfig: unknown;
  $activeLayoutConfig = new BehaviorSubject<unknown | undefined>(undefined);
  $appConfig = new BehaviorSubject<ApplicationConfig | undefined>(undefined);

  constructor(private http: HttpClient) {}

  initAppConfig(): Observable<ApplicationConfig> {
    const $req = this.http.get<ApplicationConfig>(APP_CONFIG_PATH).pipe(share());
    $req.subscribe((response: ApplicationConfig) => {
      this.$appConfig.next(response);
      this.appConfig = response;
    });
    return $req;
  }

  getActiveLayoutConfig(routePath: string): Observable<unknown> {
    const $req = this.http.get<unknown>(`assets/config/${routePath}-config.json`).pipe(share());
    $req.subscribe(response => {
      this.$activeLayoutConfig.next(response);
      this.activeLayoutConfig = response;
    });
    return $req;
  }
}
