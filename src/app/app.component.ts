import { Component } from '@angular/core';
import { ApplicationConfigService } from './core/services/application-config.service';

@Component({
  selector: 'octo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private appService: ApplicationConfigService) {}

  ngOnInit(): void {
    this.appService.initAppConfig();
  }
}
