import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguratorService } from '../../services/configurator.service';

@Component({
  selector: 'octo-config-start',
  templateUrl: './config-start.component.html',
  styleUrls: ['./config-start.component.scss']
})
export class ConfigStartComponent {
  constructor(private configService: ConfiguratorService, private router: Router) { }

  start() {
    this.configService.isStarted = true;
    this.router.navigate(['configurator/overview']);
  }
}
