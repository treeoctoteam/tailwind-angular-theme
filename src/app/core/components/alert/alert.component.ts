import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AlertService, OctoAlert } from '../../services/alert.service';

@Component({
  selector: 'octo-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements AfterViewInit {

  alerts: OctoAlert[] = [];

  constructor(private alertService: AlertService,
              private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.alertService.$alerts.subscribe((alert: OctoAlert) => {
      this.alerts = [...this.alerts, alert];
      this.changeDetector.markForCheck();
    });
  }

  afterAlertHide(alert: OctoAlert) {
    this.alerts = this.alerts.filter(a => a !== alert);
  }
}
