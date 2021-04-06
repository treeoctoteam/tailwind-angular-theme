import { Component, OnInit } from '@angular/core';
import { ThemeConfigService } from '../../services/theme-config.service';

@Component({
  selector: 'octo-theme-select',
  templateUrl: './theme-select.component.html',
  styleUrls: ['./theme-select.component.scss']
})
export class ThemeSelectComponent {
  theme = localStorage.theme;
  themes = [];

  constructor(private themeService: ThemeConfigService) {
    this.themes = this.themeService.themes;
    this.theme = this.theme;
  }

  themeChange(mode) {
    this.themeService.switchThemeMode(mode?.detail?.value);
  }
}
