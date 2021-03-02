import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './layout/dashboard/dashboard.module';
import { ApplicationService } from './core/services/application.service';
import { HttpRequestInterceptorService } from './core/services/http-request-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptorService, multi: true },
    // { provide: APP_INITIALIZER, useFactory: loadConfig, multi: true, deps: [HttpClient, ApplicationService] },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}

export function loadConfig(http: HttpClient, config: ApplicationService): void {
  // http
  //   .get("./appConfig.json")
  //   .subscribe(res => {
  //     config.INITIALIZE(res);
  //   },
  //     err => {
  //       console.log("CANNOT LOAD APPCONFIG.JSON FILE: Status", err.status);
  //     })
};
