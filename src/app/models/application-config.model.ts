import { CustomerInfo } from "./customer-info.model";
import { Language } from "./language.model";
import { Network } from "./network.model";
import { ThemeConfig } from "./theme-config.model";

export interface ApplicationConfig {
  startup: "api" | "file";
  customerInfo: CustomerInfo;
  network: Network;
  defaultLayout: string;
  layouts: string[];
  enableAuthentication: boolean;
  authenticationMode: "JWT" | "Cookie";
  defaultLanguage: string;
  languages: Language[];
  theme: ThemeConfig;
}

