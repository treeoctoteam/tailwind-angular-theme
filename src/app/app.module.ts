import { APP_INITIALIZER } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './layout/dashboard/dashboard.module';
import { ApplicationService } from './core/services/application.service';
import { HttpRequestInterceptorService } from './core/services/http-request-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptorService, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ApplicationService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function initConfig(appConfigService: ApplicationService, _http: HttpClient) {
  return () =>
    _http.get('./assets/config/application.config.json')
      .toPromise()
      .then((config: any) => {
        appConfigService.config = config;
        appConfigService.configSubject$.next(config);
      })
      .catch((err: any) => {
        console.log("CANNOT LOAD APPCONFIG.JSON FILE: Status", err.status);
        console.error(err);
      })
}