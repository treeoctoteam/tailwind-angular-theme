import { OctoFormModel } from './../../../@Octo/form/models/octo-form.model';
import { DashboardConfig } from './../../models/modules.model';
import { OctoFormUtilsService } from '../../../@Octo/form/octo-form-utils.service';
import { share } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { ApplicationConfig } from '../../../shared/models/application-config.model';
import { Injectable } from '@angular/core';
import { Language } from 'src/app/shared/models/language.model';
const DASHBOARD_CONFIG_PATH = 'assets/config/dashboard-config.json';
const APP_CONFIG_PATH = 'assets/config/application-config.json';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  isStarted = false;
  config: DashboardConfig | ApplicationConfig;
  $config = new Subject<DashboardConfig | ApplicationConfig>();

  constructor(private http: HttpClient, private formUtilsService: OctoFormUtilsService) { }

  getApplicationConfig(): Observable<ApplicationConfig> {
    const $req = this.http.get<ApplicationConfig>(APP_CONFIG_PATH).pipe(share());
    $req.subscribe((response: ApplicationConfig) => {
      console.log('res', response);
      this.$config.next(response);
      this.config = response;
    });
    return $req;
  }

  getDashboardConfig(): Observable<DashboardConfig> {
    const $req = this.http.get<DashboardConfig>(DASHBOARD_CONFIG_PATH).pipe(share());
    $req.subscribe((response: DashboardConfig) => {
      console.log('res', response);
      this.$config.next(response);
      this.config = response;
    });
    return $req;
  }

  generateAppConfigFromOctoForm(form: OctoFormModel) {
    const newConfig: ApplicationConfig = this.config as ApplicationConfig;

    newConfig.startup = this.formUtilsService.getFieldFormMap(form?.sections?.find(s => s.name === 'startup')).find(f => f.name === 'startup')?.value.toString() as 'api' | 'file';

    const customerInfoSection = this.formUtilsService.getFieldFormMap(form?.sections?.find(s => s.name === 'customerInfo'));
    newConfig.customerInfo.name = customerInfoSection.find(f => f.name === 'name')?.value.toString();
    newConfig.customerInfo.address = customerInfoSection.find(f => f.name === 'address')?.value.toString();
    newConfig.customerInfo.phone = customerInfoSection.find(f => f.name === 'phone')?.value.toString();
    newConfig.customerInfo.supportEmail = customerInfoSection.find(f => f.name === 'supportEmail')?.value.toString();

    const authenticationSettingsSection = this.formUtilsService.getFieldFormMap(form?.sections?.find(s => s.name === 'authenticationSettings'));
    newConfig.authenticationSettings.authenticationMode = authenticationSettingsSection.find(f => f.name === 'authenticationMode')?.value as 'JWT' | 'Cookie';
    newConfig.authenticationSettings.enableAuthentication = authenticationSettingsSection.find(f => f.name === 'enableAuthentication')?.value as any;

    const layoutSection = this.formUtilsService.getFieldFormMap(form?.sections?.find(s => s.name === 'layoutSettings'));
    newConfig.layoutSettings.defaultLayout = layoutSection.find(f => f.name === 'defaultLayout')?.value as string;
    newConfig.layoutSettings.layouts = layoutSection.find(f => f.name === 'layouts')?.value as string[];

    const idleConfigSection = this.formUtilsService.getFieldFormMap(form?.sections?.find(s => s.name === 'idleConfig'));
    newConfig.idleConfig.idle = idleConfigSection.find(f => f.name === 'idle')?.value as number;
    newConfig.idleConfig.timeout = idleConfigSection.find(f => f.name === 'timeout')?.value as number;
    newConfig.idleConfig.ping = idleConfigSection.find(f => f.name === 'ping')?.value as number;

    const networkSection = this.formUtilsService.getFieldFormMap(form?.sections?.find(s => s.name === 'network'));
    newConfig.network.basePath = networkSection.find(f => f.name === 'basePath')?.value as string;
    newConfig.network.host = networkSection.find(f => f.name === 'host')?.value as string;
    newConfig.network.hostApi = networkSection.find(f => f.name === 'hostApi')?.value as string;
    newConfig.network.hostApiV1 = networkSection.find(f => f.name === 'hostApiV1')?.value as string;
    newConfig.network.hostApiV2 = networkSection.find(f => f.name === 'hostApiV2')?.value as string;
    newConfig.network.hostApiV3 = networkSection.find(f => f.name === 'hostApiV3')?.value as string;
    newConfig.network.openViduServerUrl = networkSection.find(f => f.name === 'openViduServerUrl')?.value as string;

    const themeSection = this.formUtilsService.getFieldFormMap(form?.sections?.find(s => s.name === 'theme'));
    newConfig.theme.favicon = themeSection.find(f => f.name === 'favicon')?.value as string;

    const languageSettingsSection = this.formUtilsService.getFieldFormMap(form?.sections?.find(s => s.name === 'languageSettings'));
    newConfig.languageSettings.defaultLanguage = languageSettingsSection.find(f => f.name === 'defaultLanguage')?.value as string;
    newConfig.languageSettings.languages = languageSettingsSection.find(f => f.name === 'languages')?.value as Language[];

    return newConfig;
  }

  generateDashboardConfigFromOctoForm(config) {
    const form: OctoFormModel = config.form;
    const newConfig: DashboardConfig = this.config as DashboardConfig;
    newConfig.navbar.logoPath = this.formUtilsService.getFieldFormMap(form?.sections?.find(s => s.name === 'navbar')).find(f => f.name === 'logoPath')?.value.toString();
    newConfig.navbar.navigation = config.navbar;
    newConfig.footer.logoPath = this.formUtilsService.getFieldFormMap(form?.sections?.find(s => s.name === 'footer')).find(f => f.name === 'logoPath')?.value.toString();
    newConfig.footer.navigation = config.footer;
    newConfig.sidebar.logoPath = this.formUtilsService.getFieldFormMap(form?.sections?.find(s => s.name === 'sidebar')).find(f => f.name === 'logoPath')?.value.toString();
    newConfig.sidebar.navigation = config.sidebar;
    newConfig.authenticate = this.formUtilsService.getFieldFormMap(form?.sections?.find(s => s.name === 'othersconfig')).find(f => f.name === 'authenticate')?.value as boolean;
    newConfig.defaultRoute = this.formUtilsService.getFieldFormMap(form?.sections?.find(s => s.name === 'othersconfig')).find(f => f.name === 'defaultRoute')?.value.toString();
    return newConfig;
  }
}
