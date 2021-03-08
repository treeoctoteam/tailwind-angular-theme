import { CustomerInfo } from "./customer-info.model";
import { Language } from "./language.model";
import { Network } from "./network.model";
import { Theme } from "./theme.model";

export interface ApplicationConfig {
  startup: "api" | "file";
  customerInfo: CustomerInfo;
  network: Network;
  startPage: string;
  layouts: string[];
  defaultLanguage: string;
  languages: Language[];
  theme: Theme;
}

