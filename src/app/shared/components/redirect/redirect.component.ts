import { ApplicationConfig } from './../../models/application-config.model';
import { DashboardConfigService } from './../../../modules/dashboard/services/dashboard-config.service';
import { takeUntil } from 'rxjs/operators';
import { DashboardConfig, PublicConfig } from '../../../modules/models/modules.model';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PublicConfigService } from 'src/app/modules/public/services/public.service';
import { ApplicationConfigService } from 'src/app/core/services/application-config.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'octo-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnDestroy {
  private $unsubscribe = new Subject();
  constructor(
    private router: Router,
    public publicConfigService: PublicConfigService,
    private dashboardConfigService: DashboardConfigService,
    private appConfigService: ApplicationConfigService
  ) {

    if (this.router.url.match('public')) {
      this.publicConfigService.$config.pipe(takeUntil(this.$unsubscribe)).subscribe(
        (res: PublicConfig) => {
          if (res) {
            this.router.navigateByUrl(res.defaultRoute);
          }
        }
      );
    }
    else if (this.router.url.match('dashboard')) {
      console.log("DASH")
      this.dashboardConfigService.$config.pipe(takeUntil(this.$unsubscribe)).subscribe(
        (res: DashboardConfig) => {
          if (res) {
            this.router.navigateByUrl(res.defaultRoute);
          }
        }
      );
    }
    else{
      this.appConfigService.$config.pipe(takeUntil(this.$unsubscribe)).subscribe(
        (res: ApplicationConfig) => {
          if (res) {
            this.router.navigateByUrl(res.layoutSettings.defaultLayout);
          }
        }
      );
    }
  }
  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
