import { Language } from "./language.model";
export interface LanguageSetting {
  defaultLanguage: string;
  languages: Language[];
}