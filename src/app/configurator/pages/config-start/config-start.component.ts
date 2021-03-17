import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'octo-config-start',
  templateUrl: './config-start.component.html',
  styleUrls: ['./config-start.component.scss']
})
export class ConfigStartComponent implements OnInit {
  key = "";
  constructor() { }

  ngOnInit(): void {
  }
  change(e: any) {
    console.log(e);
    this.key = e.detail;
  }
  validate() {
    alert(this.key)
  }
}
