import { OctoFormUtilsService } from 'src/app/@Octo/form/octo-form-utils.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { OctoFormModel } from 'src/app/@Octo/form/models/octo-form.model';
import { ApplicationConfig } from 'src/app/shared/models/application-config.model';

const APP_CONFIG_PATH = 'assets/config/application-config.json';

@Injectable({
  providedIn: 'root'
})
export class ApplicationConfigService {

  config: ApplicationConfig;
  $config = new Subject<ApplicationConfig>();

  constructor(private http: HttpClient, private router: Router, private formUtilsService: OctoFormUtilsService) { }

  initAppConfig(): Observable<ApplicationConfig> {
    const $req = this.http.get<ApplicationConfig>(APP_CONFIG_PATH).pipe(share());
    $req.subscribe((response: ApplicationConfig) => {
      this.$config.next(response);
      this.config = response;
      console.log("CONFIG", this.config);
      let navigationExist = this.config.layouts.some(l => this.router.url.includes(l));
      if (!navigationExist) {
        this.router.navigateByUrl(this.config.defaultLayout);
      }
    });
    return $req;
  }

  generateFromOctoForm(form: OctoFormModel) {
    const result = this.formUtilsService.getSectionFormMap(form);
    console.log("APPCONFIG SERVICE RESULT",result);
    // aggiornare this config con i valore di result
    this.$config.next(this.config);
  }


}
