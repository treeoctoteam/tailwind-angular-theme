import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Locale {
  lang: string;
  data: any;
}

// export interface Country {
//   id: string;
//   title: string;
//   flag: string;
//   iso3code: string;
//   enabled: boolean;
// }

export interface Country {
  id: number;
  number: number;
  alpa2code: string;
  alpha3code: string;
  countryName: string;
  domain: string;
  mrzCode: string;
}

@Injectable({
  providedIn: 'root'
})

export class I18nService {

  private countriesURL = '../../../assets/config/countries.json';
  public countries: Country[];

  constructor(private translateService: TranslateService, private http: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Load translations
   *
   * @param {Locale} args
   */

  loadTranslations(...args: Locale[]): void {
    const locales = [...args];
    locales.forEach((locale) => {
      // use setTranslation() with the third argument set to true
      // to append translations instead of replacing them
      this.translateService.setTranslation(locale.lang, locale.data, true);
    });
  }

  getCountries() {
    this.http.get(this.countriesURL).subscribe((data: any) => {
      this.countries = data.countries;
    })
  }
}
