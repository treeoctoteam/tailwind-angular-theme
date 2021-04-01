import { OctoSectionModel } from './../../@Octo/form/models/octo-section.model';
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

  generateConfigFromOctoForm(form: OctoFormModel) {

    let newConfig: ApplicationConfig = this.config;
    newConfig.startup = this.formUtilsService.getFieldFormMap(form.sections.find(s => s.name === "startup")).find(f => f.name === "startup").value.toString() as "api" | "file";
    console.log(newConfig)
    // this.config.customerInfo.name = customerInfo.find(f => f.name == "startup").value;s
    // this.config.customerInfo.address = this.appConfigForm.sections[1].fields[1].value;
    // this.config.customerInfo.supportEmail = this.appConfigForm.sections[1].fields[2].value;
    // this.config.customerInfo.phone = this.appConfigForm.sections[1].fields[3].value;
    // this.config.network.host = this.appConfigForm.sections[2].fields[0].value;
    // this.config.network.basePath = this.appConfigForm.sections[2].fields[1].value;
    // this.config.network.hostApi = this.appConfigForm.sections[2].fields[2].value;
    // this.config.network.hostApiV1 = this.appConfigForm.sections[2].fields[3].value;
    // this.config.network.hostApiV2 = this.appConfigForm.sections[2].fields[4].value;
    // this.config.network.hostApiV3 = this.appConfigForm.sections[2].fields[5].value;
    // this.config.network.openViduServerUrl = this.appConfigForm.sections[2].fields[6].value;
    // this.config.enableAuthentication = this.appConfigForm.sections[3].fields[0].value;
    // this.config.authenticationMode = this.appConfigForm.sections[3].fields[1].value;
    // this.config.idleConfig.timeout = this.appConfigForm.sections[4].fields[0].value;
    // this.config.idleConfig.idle = this.appConfigForm.sections[4].fields[1].value;
    // this.config.idleConfig.ping = this.appConfigForm.sections[4].fields[2].value;
    // this.config.defaultLayout = this.appConfigForm.sections[5].fields[0].value;
    // this.config.layouts = this.appConfigForm.sections[5].fields[0].value;
    // this.config.defaultLanguage = this.appConfigForm.sections[7].fields[0].value;
    // this.config.theme.favicon = this.appConfigForm.sections[8].fields[0].value;
    // let enabledLanguageFromForm = [];
    // (this.appConfigForm.sections[7].fields[1].value as string[])?.forEach(selectLanguage => {
    //   console.log(selectLanguage);
    //   this.languages.forEach(language => {
    //     if (language.flag === selectLanguage) {
    //       language.enabled = true;
    //       enabledLanguageFromForm = [language, ...enabledLanguageFromForm]
    //     }
    //   })
    // });



    // aggiornare this config con i valore di result
    this.$config.next(this.config);
  }


}
