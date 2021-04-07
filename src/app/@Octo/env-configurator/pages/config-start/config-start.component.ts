import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'octo-config-start',
  templateUrl: './config-start.component.html',
  styleUrls: ['./config-start.component.scss']
})
export class ConfigStartComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  start() {
    this.router.navigate(["configurator/overview"])
  }
}