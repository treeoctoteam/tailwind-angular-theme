import { OctoSectionModel } from './../../@Octo/form/models/octo-section.model';
import { OctoFormUtilsService } from 'src/app/@Octo/form/octo-form-utils.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { OctoFormModel } from 'src/app/@Octo/form/models/octo-form.model';
import { ApplicationConfig } from 'src/app/shared/models/application-config.model';
import { Language } from 'src/app/shared/models/language.model';

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
      let navigationExist = this.config.layoutSettings.layouts.some(l => this.router.url.includes(l));
      if (!navigationExist) {
        this.router.navigateByUrl(this.config.layoutSettings.defaultLayout);
      }
    });
    return $req;
  }


  generateConfigFromOctoForm(form: OctoFormModel) {
    let newConfig: ApplicationConfig = this.config;

    newConfig.startup = this.formUtilsService.getFieldFormMap(form.sections.find(s => s.name === "startup")).find(f => f.name === "startup").value.toString() as "api" | "file";

    const customerInfoSection = this.formUtilsService.getFieldFormMap(form.sections.find(s => s.name === "customerInfo"))
    newConfig.customerInfo.name = customerInfoSection.find(f => f.name === "name").value.toString();
    newConfig.customerInfo.address = customerInfoSection.find(f => f.name === "address").value.toString();
    newConfig.customerInfo.phone = customerInfoSection.find(f => f.name === "phone").value.toString();
    newConfig.customerInfo.supportEmail = customerInfoSection.find(f => f.name === "supportEmail").value.toString();

    const authenticationSettingsSection = this.formUtilsService.getFieldFormMap(form.sections.find(s => s.name === "authenticationSettings"));
    newConfig.authenticationSettings.authenticationMode = authenticationSettingsSection.find(f => f.name === "authenticationMode").value as "JWT" | "Cookie";
    newConfig.authenticationSettings.enableAuthentication = authenticationSettingsSection.find(f => f.name === "enableAuthentication").value as boolean;

    const layoutSection = this.formUtilsService.getFieldFormMap(form.sections.find(s => s.name === "layoutSettings"));
    newConfig.defaultLayout = layoutSection.find(f => f.name === "defaultLayout").value as string;
    newConfig.layouts = layoutSection.find(f => f.name === "layouts").value as string[];

    const idleConfigSection = this.formUtilsService.getFieldFormMap(form.sections.find(s => s.name === "idleConfig"));
    newConfig.idleConfig.idle = idleConfigSection.find(f => f.name === "idle").value as number;
    newConfig.idleConfig.timeout = idleConfigSection.find(f => f.name === "timeout").value as number;
    newConfig.idleConfig.ping = idleConfigSection.find(f => f.name === "ping").value as number;

    const networkSection = this.formUtilsService.getFieldFormMap(form.sections.find(s => s.name === "network"));
    newConfig.network.basePath = networkSection.find(f => f.name === "basePath").value as string;
    newConfig.network.host = networkSection.find(f => f.name === "host").value as string;
    newConfig.network.hostApi = networkSection.find(f => f.name === "hostApi").value as string;
    newConfig.network.hostApiV1 = networkSection.find(f => f.name === "hostApiV1").value as string;
    newConfig.network.hostApiV2 = networkSection.find(f => f.name === "hostApiV2").value as string;
    newConfig.network.hostApiV3 = networkSection.find(f => f.name === "hostApiV3").value as string;
    newConfig.network.openViduServerUrl = networkSection.find(f => f.name === "openViduServerUrl").value as string;

    const themeSection = this.formUtilsService.getFieldFormMap(form.sections.find(s => s.name === "theme"));
    newConfig.theme.favicon = themeSection.find(f => f.name === "favicon").value as string;

    const languageSettingsSection = this.formUtilsService.getFieldFormMap(form.sections.find(s => s.name === "languageSettings"));
    newConfig.languageSettings.defaultLanguage = languageSettingsSection.find(f => f.name === "defaultLanguage").value as string;
    newConfig.languageSettings.languages = languageSettingsSection.find(f => f.name === "languages").value as Language[];

    console.log("NEW CONFIG", newConfig);
    return newConfig
  }


}
