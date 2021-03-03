import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
// import { NgxSpinnerService } from "ngx-spinner";
import { LoggerService } from "./logger.service";
import { IAppConfig } from "../../models/appConfig.interface";

@Injectable({
  providedIn: "root",
})
export class ApplicationService {
  env: string;
  appConfig: IAppConfig;
  constructor(
    // @Inject(DOCUMENT) private document: Document,
    // private _spinner: NgxSpinnerService,
    private _logger: LoggerService
  ) {
    this._logger.logSystem(this.appConfig);
  }

  initialize() {
    // this._spinner.show();
    this._logger.logSystem(this.appConfig);
    document.title = this.appConfig.ui.title;
    const head = document.getElementsByTagName("head")[0];
    const favicon = this.setFavicon();
    console.log(favicon);
    head.appendChild(favicon);
    const css = this.setCss();
    head.appendChild(css);
    this.setWebManifest();
    setTimeout(() => {
      // this._spinner.hide();
    }, 700);
  }
  changeUserTheme(name: string) {
    // this._spinner.show();
    //CALL API
    this.appConfig.ui.theme = name;

    document.title = this.appConfig.ui.title;

    // CHANGE CSS
    const css = this.setCss();
    const theme = document.getElementById("theme")
    theme?.replaceWith(css);
    // CHANGE FAVICON
    const favicon = this.setFavicon();
    const appFavicon = document.getElementById("appFavicon");
    appFavicon?.replaceWith(favicon);
    setTimeout(() => {
      // this._spinner.hide();
    }, 700);
  }

  setFavicon() {

    const favicon = document.createElement("link");
    favicon.id = "appFavicon";
    favicon.rel = "icon";
    favicon.type = "image/x-icon";
    favicon.href = this.appConfig.ui.favicon;
    const defaultFavicon = document.getElementById("defaultFavicon")
    defaultFavicon?.remove();
    return favicon;
  }

  setCss() {
    const css = document.createElement("link");
    css.id = "theme";
    css.rel = "stylesheet";
    css.href = `./assets/theme/${this.appConfig.ui.theme}/_${this.appConfig.ui.theme}.css`;
    return css;
  }
  setWebManifest() {
    const myDynamicManifest = {
      name: `Digital Onboarding | ${this.appConfig.ui.theme.toUpperCase()}`,
      short_name: `${this.appConfig.ui.theme.toUpperCase()}`,
      description: `Digital Onboarding | ${this.appConfig.ui.theme.toUpperCase()}`,
      start_url: "./",
      scope: "./",
      display: "standalone",
      background_color: "#000000",
      theme_color: "#0f4a73",
      icons: [
        {
          src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-72x72.png`,
          sizes: "72x72",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-96x96.png`,
          sizes: "96x96",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-128x128.png`,
          sizes: "128x128",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-144x144.png`,
          sizes: "144x144",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-152x152.png`,
          sizes: "152x152",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-192x192.png`,
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-384x384.png`,
          sizes: "384x384",
          type: "image/png",
          purpose: "maskable any",
        },
        {
          src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-512x512.png`,
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable any",
        },
      ],
    };
    const stringManifest = JSON.stringify(myDynamicManifest);
    const blob = new Blob([stringManifest], { type: "application/json" });
    const manifestURL = URL.createObjectURL(blob);
    const appManifest = document.querySelector("#appManifest")
    appManifest?.setAttribute("href", manifestURL);
  }
}
