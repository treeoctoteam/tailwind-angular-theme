import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'octo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  onActivate(e: any, outlet: HTMLElement) {
    console.log(e, outlet);
    window.scrollTo(0, 0);
  }
}
