import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { first, switchMap, takeUntil } from 'rxjs/operators';
import { ApplicationConfigService } from './core/services/application-config.service';
import { AuthService, User } from './core/services/auth.service';
import { DialogService } from './core/services/dialog.service';
import { ApplicationConfig } from './shared/models/application-config.model';

const USER_LOCK_DIALOG_ID =  'userLockDialogID';

@Component({
  selector: 'octo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('userLockDialog') private userLockDialogTemnplateRef: TemplateRef<any>;
  private $unsubscribe = new Subject<void>();
  activeLang: string;
  userPassword = '';

  constructor(private appService: ApplicationConfigService,
              private translateService: TranslateService,
              private authService: AuthService,
              private dialogService: DialogService,
              private router: Router) { }

  ngOnInit(): void {
    this.appService.initAppConfig();

    console.log('ciao');

    this.appService.$config.pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe((appConfig: ApplicationConfig) => {
      if (appConfig) {
        // Add languages
        this.translateService.langs = [];
        appConfig.languageSettings?.languages.forEach(lang => {
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
        if (appConfig.languageSettings.languages.find(lang => lang.id == browserLang && lang.enabled)) {
          // this._logger.logSystem("Active Language :" + browserLang);
          this.translateService.use(browserLang);
        }

        this.activeLang = this.translateService.currentLang;
        // don't forget to unsubscribe!
        this.translateService.onLangChange
          .pipe(takeUntil(this.$unsubscribe))
          .subscribe((langChangeEvent: LangChangeEvent) => {
            this.activeLang = langChangeEvent.lang;
          });

        this.authService.initIdleMonitoring(appConfig.idleConfig);

        window.addEventListener("online", this.onNetworkStatusChange.bind(this));
        window.addEventListener("offline", this.onNetworkStatusChange.bind(this));
      }
    });

    this.authService.$lockUserSubject.pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe(() => this.presentUserLockDialog());
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  private presentUserLockDialog(): void {
    this.dialogService.open({ hasCustomTemplate: true, hasBackdrop: true }, USER_LOCK_DIALOG_ID, this.userLockDialogTemnplateRef);
  }

  unlockUserSession(): void {
    this.authService.$loggedUserSubject.pipe(
      first(),
      takeUntil(this.$unsubscribe),
      switchMap((user: User) => this.authService.login({email: user.email, password: this.userPassword}))
    ).subscribe(() => {
      this.userPassword = '';
      this.dialogService.close(USER_LOCK_DIALOG_ID);
    });
  }

  onPasswordChange(event): void {
    this.userPassword = (event as any).detail.value;
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
