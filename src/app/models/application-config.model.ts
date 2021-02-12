import { CustomerInfo } from "./customer-info.model";
import { Language } from "./language.model";
import { Network } from "./network.model";

export interface ApplicationConfig {
  startup: string | "api" | "file";
  customerInfo: CustomerInfo;
  network: Network;
  startPage: string;
  layouts: string[];
  defaultLanguage: string;
  languages: Language[];
}

