import { LayoutSettings } from './layout-settings.model';
import { CustomerInfo } from "./customer-info.model";
import { Network } from "./network.model";
import { ThemeConfig } from "./theme-config.model";
import { UserIdleConfig } from "angular-user-idle";
import { AuthenticationSettings } from "./authentication-settings.model";
import { LanguageSettings } from "./language-settings.model";

export interface ApplicationConfig {
  startup: "api" | "file";
  customerInfo: CustomerInfo;
  network: Network;
  layoutSettings: LayoutSettings;
  authenticationSettings: AuthenticationSettings;
  languageSettings: LanguageSettings;
  theme: ThemeConfig;
  idleConfig: UserIdleConfig
}


