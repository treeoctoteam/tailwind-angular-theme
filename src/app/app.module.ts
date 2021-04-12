import { HttpRequestInterceptorService } from './core/interceptors/http-request-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { UserIdleModule } from 'angular-user-idle';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    CoreModule,
    HttpClientModule,
    UserIdleModule.forRoot({ idle: 1000, timeout: 1000, ping: 1000 })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

export function loadConfig(): void {};
