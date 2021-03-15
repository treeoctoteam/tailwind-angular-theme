import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService, OctoAlert } from '../../services/alert.service';

@Component({
  selector: 'octo-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnDestroy {

  private $unsubscribe = new Subject<void>();
  alerts: OctoAlert[] = [];

  constructor(private alertService: AlertService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.alertService.$alerts.pipe(
      takeUntil(this.$unsubscribe)
    ).subscribe((alert: OctoAlert) => {
      this.alerts = [...this.alerts, alert];
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
  }

  afterAlertHide(alert: OctoAlert) {
    this.alerts = this.alerts.filter(a => a !== alert);
  }
}
