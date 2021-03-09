import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'octo-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.present('success', 'Titolo di test', 'Messaggio di test!');
    this.alertService.present('info', 'Titolo di test', 'Messaggio di test!');
    this.alertService.present('primary', 'Titolo di test', 'Messaggio di test!');
    this.alertService.present('warning', 'Titolo di test', 'Messaggio di test!');
    this.alertService.present('danger', 'Titolo di test', 'Messaggio di test!');
    this.alertService.present('success', 'Titolo di test', 'Messaggio di test!', 6000);
  }

  onActivate(e: any, outlet: HTMLElement) {
    console.log(e, outlet);
    window.scrollTo(0, 0);
  }
}
