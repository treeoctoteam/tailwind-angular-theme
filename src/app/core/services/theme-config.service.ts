import { Injectable } from '@angular/core';
import { ApplicationConfigService } from 'src/app/core/services/application-config.service';
import { ApplicationConfig } from 'src/app/shared/models/application-config.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeConfigService {
  themes = [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }];
  theme = "light";

  constructor(private appConfigService: ApplicationConfigService) {
    this.appConfigService.$config.subscribe((config: ApplicationConfig) => {
      this.setFavicon(config);
      this.setWebManifest(config);
    })
  }

  setFavicon(config: ApplicationConfig) {
    console.log("SET FAVICON", config.theme.favicon);
    const favicon = document.createElement("link");
    favicon.id = "appFavicon";
    favicon.rel = "icon";
    favicon.type = "image/x-icon";
    favicon.href = config.theme.favicon;
    const defaultFavicon = document.getElementById("defaultFavicon")
    defaultFavicon?.remove();
    return favicon;
  }
  setWebManifest(config: ApplicationConfig) {
    const myDynamicManifest = {
      name: `TreeOcto | ${config.customerInfo.name.toUpperCase()}`,
      short_name: `${config.customerInfo.name.toUpperCase()}`,
      description: `TreeOcto | ${config.customerInfo.name.toUpperCase()}`,
      start_url: "./",
      scope: "./",
      display: "standalone",
      background_color: "#000000",
      theme_color: "#0f4a73",
      icons: [
        // {
        //   src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-72x72.png`,
        //   sizes: "72x72",
        //   type: "image/png",
        //   purpose: "maskable any",
        // },
        // {
        //   src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-96x96.png`,
        //   sizes: "96x96",
        //   type: "image/png",
        //   purpose: "maskable any",
        // },
        // {
        //   src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-128x128.png`,
        //   sizes: "128x128",
        //   type: "image/png",
        //   purpose: "maskable any",
        // },
        // {
        //   src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-144x144.png`,
        //   sizes: "144x144",
        //   type: "image/png",
        //   purpose: "maskable any",
        // },
        // {
        //   src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-152x152.png`,
        //   sizes: "152x152",
        //   type: "image/png",
        //   purpose: "maskable any",
        // },
        // {
        //   src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-192x192.png`,
        //   sizes: "192x192",
        //   type: "image/png",
        //   purpose: "maskable any",
        // },
        // {
        //   src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-384x384.png`,
        //   sizes: "384x384",
        //   type: "image/png",
        //   purpose: "maskable any",
        // },
        // {
        //   src: `assets/theme/${this.appConfig.ui.theme}/icons/mobile/icon-512x512.png`,
        //   sizes: "512x512",
        //   type: "image/png",
        //   purpose: "maskable any",
        // },
      ],
    };
    const stringManifest = JSON.stringify(myDynamicManifest);
    const blob = new Blob([stringManifest], { type: "application/json" });
    const manifestURL = URL.createObjectURL(blob);
    const appManifest = document.querySelector("#appManifest")
    appManifest?.setAttribute("href", manifestURL);
  }

  switchThemeMode(theme: string) {
    this.theme = theme;
    localStorage.theme = theme;
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}
