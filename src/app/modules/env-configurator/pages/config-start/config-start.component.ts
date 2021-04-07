import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguratorService } from '../../services/configurator.service';

@Component({
  selector: 'octo-config-start',
  templateUrl: './config-start.component.html',
  styleUrls: ['./config-start.component.scss']
})
export class ConfigStartComponent implements OnInit {
  constructor(private configService: ConfiguratorService, private router: Router) { }

  ngOnInit(): void {
  }

  start() {
    this.configService.isStarted = true;
    this.router.navigate(["configurator/overview"])
  }
}
