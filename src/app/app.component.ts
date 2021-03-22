import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApplicationConfigService } from './core/services/application-config.service';
import { ApplicationConfig } from './models/application-config.model';

@Component({
  selector: 'octo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private $unsubscribe = new Subject<void>();
  locale: string;

  constructor(private appService: ApplicationConfigService,
    private translateService: TranslateService,
    private router: Router) { }

  ngOnInit(): void {
    this.appService.initAppConfig();

    this.appService.$config.pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe((appConfig: ApplicationConfig) => {
      // Add languages
      this.translateService.langs = [];

      appConfig.languages.forEach(lang => {
        if (lang.enabled) {
          this.translateService.addLangs([lang.id]);
        }
      })
      // Set the default language
      this.translateService.setDefaultLang(this.translateService.langs[0]);

      // Use a language
      this.translateService.use(this.translateService.langs[0]);

      let browserLang = navigator.language.slice(0, 2);
      // this._logger.logInfo("Browser Language : " + browserLang);
      if (appConfig.languages.find(lang => lang.id == browserLang && lang.enabled)) {
        // this._logger.logSystem("Active Language :" + browserLang);
        this.translateService.use(browserLang);
      }

      this.locale = this.translateService.currentLang;
      // don't forget to unsubscribe!
      this.translateService.onLangChange
        .pipe(takeUntil(this.$unsubscribe))
        .subscribe((langChangeEvent: LangChangeEvent) => {
          this.locale = langChangeEvent.lang;
        });

      window.addEventListener("online", this.onNetworkStatusChange.bind(this));
      window.addEventListener("offline", this.onNetworkStatusChange.bind(this));
    })
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  onNetworkStatusChange() {
    // this._logger.logInfo("ONLINE: " + navigator.onLine);
    if (!navigator.onLine) {
      // this._logger.logSystem("SET OFFLINE_REDIRECT => " + this.router.url);
      localStorage.setItem("offlineRedirect", this.router.url);
      // this.router.navigate(["/offline"]);
    }
  }
}
