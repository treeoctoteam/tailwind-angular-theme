import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export type AlertType = 'success' | 'primary' | 'info' | 'warning' | 'danger';

export interface OctoAlert {
  id?: string;
  type: AlertType;
  postition: 'top left' | 'top right' | 'bottom left' | 'bottom rigth';
  duration: number;
  closable: boolean;
  isStandalone: boolean;
  icon: string;
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  $alerts = new Subject<OctoAlert>();
  $alertHistory = new BehaviorSubject<OctoAlert[]>([]);
  private alertHistory: OctoAlert[] = [];

  constructor() { }

  present(type: AlertType, title: string, message: string, duration = 0, closable = true): void {
    const alert: OctoAlert = {
      id: new Date().getMilliseconds().toString(),
      type,
      title,
      message,
      duration,
      closable,
      postition: 'top right',
      isStandalone: false,
      icon: this.getIconNameByAlertType(type)
    }
    this.$alerts.next(alert);
    this.alertHistory = [...this.alertHistory, alert];
    this.$alertHistory.next(this.alertHistory);
  }

  private getIconNameByAlertType(type: AlertType): string {
    switch (type) {
      case 'primary':
        return 'fal fa-info-circle';
      case 'success':
        return 'fal fa-check-circle';
      case 'info':
        return 'fal fa-cog';
      case 'warning':
        return 'fal fa-exclamation-triangle';
      case 'danger':
        return 'fal fa-exclamation-circle';
    }
  }
}
