import { CustomerInfo } from "./customer-info.model";
import { Network } from "./network.model";
import { ThemeConfig } from "./theme-config.model";
import { UserIdleConfig } from "angular-user-idle";
import { Authentication } from "./authentication.model";
import { LanguageSetting } from "./language-setting.model";

export interface ApplicationConfig {
  startup: "api" | "file";
  customerInfo: CustomerInfo;
  network: Network;
  defaultLayout: string;
  layouts: string[];
  authentication: Authentication;
  languageSetting: LanguageSetting;
  theme: ThemeConfig;
  idleConfig: UserIdleConfig
}

